import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profile: UserService, private route: ActivatedRoute,
    private router: Router) { 
      this.route.paramMap.subscribe(params => {
        const id = params.get("id")
        this.profile.getUser(id).subscribe((data: any) => {
          this.datas = data;
          console.log(data,"profile")
        })
      })
     }

  ngOnInit(): void {
    
  }

  checkFollowers(data: Array<string>){
    let user = JSON.parse(localStorage.getItem("user"))
    if(data.includes(user._id)){
     return true
    }else{
      return false
    }
  }

  follow(followId){
    this.profile.followUser(followId).subscribe(data => {
      this.profileData = data
      // console.log(this.profileData.result)
      // console.log(this.profileData.profile)
      this.datas.user = this.profileData.profile
      localStorage.setItem("user",JSON.stringify(this.profileData.result))
    })
  }
  
  unfollow(unfollowId){
    this.profile.unfollowUser(unfollowId).subscribe(data => {
      this.profileData = data
      // console.log(this.profileData.result)
      // console.log(this.profileData.profile)
      this.datas.user = this.profileData.profile
      localStorage.setItem("user",JSON.stringify(this.profileData.result))
    })
  }

  datas = null;
  profileData = null;
}
