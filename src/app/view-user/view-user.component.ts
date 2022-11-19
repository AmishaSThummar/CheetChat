import { Component, OnInit } from '@angular/core';
import User from '../user';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  private userId:string='';
  // state:Boolean = false;
  user:User=new User();
  constructor(public userService:UserService) { 
  }

  ngOnInit(): void {
    this.userId=sessionStorage.getItem('userId')||"";
    // this.state = true;
    console.log("Inside view user component method.");
    console.log(this.userId);
    this.userService.viewUser(this.userId).subscribe({
      next:data=>{
        console.log(data);
        this.user=data;
        console.log("Success");
      },
      error:err=>{
        console.log(err);
        console.log("Oppps! Not able to found user.");
      }
    })
  }
}
