import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private Post: UserService) { }

  ngOnInit(): void {
    this.Post.allPost().subscribe(
      (data) => {
        this.datas= data;
        console.log(data)
      })
  }

  like(data){
    this.Post.likePost(data).subscribe(x => {
      this.likes = x
      data.likes = this.likes.likes
    })
  }

  unlike(data){
    this.Post.unlikePost(data).subscribe(x => {
      this.likes = x
      data.likes = this.likes.likes
    })
  }

  onSubmit(e,data){
    let comment = {
      text: e.target.value,
      _id: data._id
    }
    console.log(e)
    this.Post.commentPost(comment).subscribe(x => {
      this.comments = x
      data.comments = this.comments.comments
      console.log(this.comments)
    })
    e.target.value = ""
  }

  deletePost(data){
    this.Post.deletePost(data._id).subscribe(x => {
      console.log(x,this.datas)
      this.delete = x
      this.datas.posts = this.datas.posts.filter(item => {
        return item._id !== this.delete._id
      })
      console.log(this.datas)
    })
  }

  datas = null;
  likes = null;
  comments = null;
  delete = null;
  user = JSON.parse(localStorage.getItem("user"))
}
