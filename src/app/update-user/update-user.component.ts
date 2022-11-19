import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import User from '../user';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  private userId: string = '';
  // state:Boolean = false;
  user: User = new User();
  constructor(public userService: UserService, private router: Router) {
  }

  updateForm: FormGroup = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    mobile: new FormControl(null, [Validators.required]),
    profile: new FormControl(null)
  });



  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || "";
    // this.state = true;
    console.log("Inside update user component method.");
    console.log(this.userId);
    this.userService.viewUser(this.userId).subscribe({
      next: data => {
        console.log(data);
        this.user = data;

        console.log("Success");
      },
      error: err => {
        console.log(err);
        console.log("Oppps! Not able to found user.");
      }
    })
  }




  onSubmit() {

    if (this.updateForm.controls['userName'].dirty)
      this.user.userName = this.updateForm.value.userName;
    if (this.updateForm.controls['email'].dirty)
      this.user.email = this.updateForm.value.email;
    if (this.updateForm.controls['password'].dirty)
      this.user.password = this.updateForm.value.password;
    if (this.updateForm.controls['mobile'].dirty)
      this.user.mobile = this.updateForm.value.mobile;
    // if (this.updateForm.controls['profile'].dirty)
    //   this.user.profile = this.selectedFile.file;


    this.userService.updateUser(
      this.userId,
      this.user.userName,
      this.user.email,
      this.user.password,
      this.user.mobile,
      this.user.contacts,
      this.user.groups,
    ).subscribe(
      {
        next: data => {
          this.updateForm.reset();

          this.router.navigateByUrl('viewProfile');
        },
        error: error => {
          if (error.status == 401) {
            console.log("not able to register.");
          }
        }
      }
    );
  }


  get userName() {
    return this.updateForm.get('userName');
  }

  get password() {
    return this.updateForm.get('password');
  }

  get email() {
    return this.updateForm.get('email');
  }

  get mobile() {
    return this.updateForm.get('mobile');
  }

  get profile() {
    return this.updateForm.get('profile');
  }
}
