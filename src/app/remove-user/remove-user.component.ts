import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  private userId:string='';
  constructor(public userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.userId=sessionStorage.getItem('userId')||"";
    console.log(this.userId);
  }

  removeAccount(){
    console.log('You pressed yes');
    this.userService.removeUser(this.userId).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }

  cancel(){
    this.router.navigateByUrl('viewProfile');

  }

}
