import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-resetpassword-newpassword',
  templateUrl: './resetpassword-newpassword.component.html',
  styleUrls: ['./resetpassword-newpassword.component.scss']
})
export class ResetpasswordNewpasswordComponent implements OnInit {

  data = {
    password: '',
    token: ''
  };

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router) { 
      this.route.paramMap.subscribe((data:any) => {
          console.log(data.params.id,"token")
          this.data.token = data.params.id;
      })
    }

  ngOnInit(): void {

  }

  submit(){
    this.userService.updatePassword(this.data).subscribe((data) => {
      console.log(data)
    });
  }
}
