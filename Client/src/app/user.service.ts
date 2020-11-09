import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  signupUser(data: {
    name: string;
    email: string;
    password: string;
    pic: string;
  }){
   return this.http.post("signup",data)
  }

  signinUser(data: {
    email: string;
    password: string
  }){
   return this.http.post("signin",data)
  }

  
  GUser(data: {
    email: string;
    name: string;
    photoUrl: string;
    id: string;
  }){
   return this.http.post("guser",data)
  }

  createPost(data: {
    title: string;
    body: string;
    photo: string;
    user: any;
  }){
    console.log(this.headers)
    return this.http.post("createpost",data,{headers: this.headers})
  }

  likePost(data: {
    _id: string;
  }){
    return this.http.put("like",data,{headers: this.headers})
  }
  
  unlikePost(data: {
    _id: string;
  }){
    return this.http.put("unlike",data,{headers: this.headers})
  }

  commentPost(data: {
    _id: string;
    text: any;
  }){
    return this.http.put("comment",data,{headers: this.headers})
  }

  headers = new HttpHeaders({
    Authorization: 'Bearer '+localStorage.getItem("jwt")
});

  allPost(){
    return this.http.get("allpost")
  }
  
  getsubpost(){
    return this.http.get("getsubpost",{headers: this.headers})
  }

  myPost(){
    return this.http.get("mypost",{headers: this.headers})
  }

  
  deletePost(postid){
    return this.http.delete(`deletepost/${postid}`,{headers: this.headers})
  }

  getUser(id){
    return this.http.get(`user/${id}`,{headers: this.headers})
  }
  
  followUser(followId){
    return this.http.put('follow',{followId},{headers: this.headers})
  }
  
  unfollowUser(unfollowId){
    return this.http.put('unfollow',{unfollowId},{headers: this.headers})
  }
}


// import { Injectable } from '@angular/core';
// import {HttpClient,HttpHeaders} from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   constructor(private http: HttpClient) {

//   }

//   signupUser(data: {
//     name: string;
//     email: string;
//     password: string;
//     pic: string;
//   }){
//    return this.http.post("http://localhost:3000/signup",data)
//   }

//   signinUser(data: {
//     email: string;
//     password: string
//   }){
//    return this.http.post("http://localhost:3000/signin",data)
//   }

  
//   GUser(data: {
//     email: string;
//     name: string;
//     photoUrl: string;
//     id: string;
//   }){
//    return this.http.post("http://localhost:3000/guser",data)
//   }

//   createPost(data: {
//     title: string;
//     body: string;
//     photo: string;
//     user: any;
//   }){
//     console.log(this.headers)
//     return this.http.post("http://localhost:3000/createpost",data,{headers: this.headers})
//   }

//   likePost(data: {
//     _id: string;
//   }){
//     return this.http.put("http://localhost:3000/like",data,{headers: this.headers})
//   }
  
//   unlikePost(data: {
//     _id: string;
//   }){
//     return this.http.put("http://localhost:3000/unlike",data,{headers: this.headers})
//   }

//   commentPost(data: {
//     _id: string;
//     text: any;
//   }){
//     return this.http.put("http://localhost:3000/comment",data,{headers: this.headers})
//   }

//   headers = new HttpHeaders({
//     Authorization: 'Bearer '+localStorage.getItem("jwt")
// });

//   allPost(){
//     return this.http.get("http://localhost:3000/allpost")
//   }
  
//   getsubpost(){
//     return this.http.get("http://localhost:3000/getsubpost",{headers: this.headers})
//   }

//   myPost(){
//     return this.http.get("http://localhost:3000/mypost",{headers: this.headers})
//   }

  
//   deletePost(postid){
//     return this.http.delete(`http://localhost:3000/deletepost/${postid}`,{headers: this.headers})
//   }

//   getUser(id){
//     return this.http.get(`http://localhost:3000/user/${id}`,{headers: this.headers})
//   }
  
//   followUser(followId){
//     return this.http.put('http://localhost:3000/follow',{followId},{headers: this.headers})
//   }
  
//   unfollowUser(unfollowId){
//     return this.http.put('http://localhost:3000/unfollow',{unfollowId},{headers: this.headers})
//   }
// }

