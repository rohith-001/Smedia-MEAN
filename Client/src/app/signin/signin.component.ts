import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  data = {
    email: '',
    password: ''
  };

  jwt = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  submit(){
    this.userService.signinUser(this.data).subscribe((data) => {
      this.jwt = data
      console.log(this.jwt)
      localStorage.setItem("jwt",(this.jwt.token))
      localStorage.setItem("user",JSON.stringify(this.jwt.user))
      if(data){
        location.replace("/home")
      }
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}