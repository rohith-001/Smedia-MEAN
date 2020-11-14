import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service'

@Component({
  selector: 'app-resetpassword-email',
  templateUrl: './resetpassword-email.component.html',
  styleUrls: ['./resetpassword-email.component.scss']
})
export class ResetpasswordEmailComponent implements OnInit {

  data = {
    email: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  submit(){
    this.userService.resetPassword(this.data).subscribe((data) => {
      console.log(data)
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}
