import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  data = {
    title: null,
    body: null,
    photo: null,
    user: JSON.parse(localStorage.getItem("user"))
  };

  imgurl = null;

  selectImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.data.photo = file;
      this.upload();
    }
  }

  upload(){
    const formData = new FormData();
    formData.append('file', this.data.photo);
    formData.append('upload_preset',"Dev-icat");
    formData.append('cloud_name',"ux-unicorn");
    this.http.post('https://api.cloudinary.com/v1_1/ux-unicorn/image/upload',formData).subscribe(
      data =>  {
        this.imgurl = data;
        console.log(this.imgurl)
        this.data.photo = this.imgurl.url
      })
    // https://api.cloudinary.com/v1_1/ux-unicorn
    // this.userService.upload(this.data).subscribe(data => console.log(data));
  }

  submit(){
    this.userService.createPost(this.data).subscribe(data => console.log(data))
  }

}
