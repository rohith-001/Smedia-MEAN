import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  data = {
    query: '',
  };

  
  submit(){
    this.userService.searchUser(this.data).subscribe((data:any) => {
      console.log(data.user)
      this.searchData = data.user
    });
  };

  searchData = null;

}
