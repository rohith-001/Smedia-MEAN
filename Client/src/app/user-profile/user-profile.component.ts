import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private profile: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.profile.myPost().subscribe(
      (data) => {
        this.datas= data;
        console.log(data)
      })
  }
  
  user = null;
  datas = null;

}
