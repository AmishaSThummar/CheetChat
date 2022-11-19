import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public userId:string = "";
  constructor(private router:Router,public userService:UserService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || "";
  }
  
  logoutClick(){
    this.userService.viewUser(this.userId).subscribe({
      next:data=>{
        console.log(data);
        this.userService.updateUser(this.userId,data.userName,data.email,data.password,data.mobile,data.contacts,data.groups,data.messages,"Offline").subscribe({
          next:user=>{
            console.log(user);
          },
          error:err=>{
            console.log(err);
          }
        })
      },
      error:err=>{
        console.log(err);
      }
    })
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }

}
