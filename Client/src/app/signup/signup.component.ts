import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service'
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  data = {
    name: '',
    email: '',
    password: '',
    pic: '',
  };

  // user: SocialUser;
  // loggedIn: boolean;

  constructor(private userService: UserService, private authService: SocialAuthService,private http: HttpClient) { 
    
  }

  ngOnInit(): void {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // })
  }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
 
  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
 
  // signOut(): void {
  //   this.authService.signOut();
  // }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  submit(){
    this.userService.signupUser(this.data).subscribe(data => console.log(data));
  }

  selectImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.data.pic = file;
      this.upload()
    }
  }

  imgurl = null;

  upload(){
    const formData = new FormData();
    formData.append('file', this.data.pic);
    formData.append('upload_preset',"Dev-icat");
    formData.append('cloud_name',"ux-unicorn");
    this.http.post('https://api.cloudinary.com/v1_1/ux-unicorn/image/upload',formData).subscribe(
      data =>  {
        this.imgurl = data;
        console.log(this.imgurl)
        this.data.pic = this.imgurl.url
      })
    // https://api.cloudinary.com/v1_1/ux-unicorn
    // this.userService.upload(this.data).subscribe(data => console.log(data));
  }

  // send(){
  //   this.userService.GUser(this.user).subscribe(data => console.log(data))
  // }
}
