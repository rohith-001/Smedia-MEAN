import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signOut(){
    localStorage.clear();
    location.replace("/signin")
  }

  userCheck(){
    if(!localStorage.getItem("user")){
      location.replace("/signin");
      alert("You have to create an account first")
    }
  }

  register(){
    if(localStorage.getItem("user")){
      return false
    }else{
      return true
    }
  }
}
