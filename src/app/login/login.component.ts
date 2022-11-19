import { UserService } from './../user-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private userService:UserService,private router:Router) { }

  loginForm:FormGroup = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  msg:string = '';

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.loginUser(this.loginForm.value.userName,
      this.loginForm.value.password).subscribe({
      next: data=>{
        // console.log("Inside next :"+sessionStorage.getItem('msg'));
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('userProfile', data.profile);
        sessionStorage.setItem('userName',data.userName);
        console.log(sessionStorage);
        // console.log(data._id);

        this.userService.updateUser(data._id,data.userName,data.email,data.password,data.mobile,data.contacts,data.groups,data.messages,"Online").subscribe({
          next:user=>{
            console.log(user);
          },
          error:err=>{
            console.log(err);
          }
        })
        
        this.loginForm.reset();
        this.router.navigateByUrl('chat');
        // this.router.navigate(['/chat']).then(() => { this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }; })

      },
      error: error=>{
        if(error.status == 400)
          this.msg = 'Invalid Username and password.';
        else if(error.status == 401)
          this.msg = 'Invalid password.';
        console.log("not able to login => inside login component");
      }
    });
    
  }

  // save(){
  //   sessionStorage.setItem('userId','6354eb3b037b28f1ef9dc1f2');
  //   console.log(sessionStorage.getItem('userId'));
  // }

  get userName(){
    return this.loginForm.get('userName');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
