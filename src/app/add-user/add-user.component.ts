import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service.service';
import User from '../user';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';


class ImageSnippet {
  constructor(public src: string = '', public file: any) { }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  registerationForm: FormGroup;
  preview: String = '';
  percentDone: any = 0;
  users: Array<string> = [];

  // user: User = new User();

  status: string = "";

  constructor(public fb: FormBuilder, private userService: UserService, public router: Router) {
    this.registerationForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl(null, [Validators.required]),
      profile: [null],
    });
  }


  ngOnInit(): void {
    this.userService.getAllUser().subscribe({
      next: data => {
        for (var v of data) {
          this.users.push(v.userName);
          console.log(this.users);
        }

      },
      error: err => {
        console.log(err);
      }
    })
  }


  selectedFile: ImageSnippet = new ImageSnippet("", null);

  public fileChange(imageInput: any) {

    const file: File = imageInput.files[0];

    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log("Inside onSubmit method:");
    // console.log(this.registerationForm.value.userName,this.registerationForm.value.email,this.registerationForm.value.password,this.registerationForm.value.mobile,this.registerationForm.value.profile);

    if (this.users.includes(this.registerationForm.value.userName)) {
      this.status = "This username already exists";
    }
    else {
      this.userService.addUser(
        this.registerationForm.value.userName,
        this.registerationForm.value.email,
        this.registerationForm.value.password,
        this.registerationForm.value.mobile,
        this.selectedFile.file,
      ).subscribe(
        {
          next: data => {
            this.registerationForm.reset();
            this.router.navigateByUrl('login');
            // this.status = "You are registered successfully.";
          },
          error: error => {
            if (error.status == 401) {
              this.status = "Username is already taken.";
            }
          }
        }
      );
    }
  }


  get userName() {
    return this.registerationForm.get('userName');
  }

  get password() {
    return this.registerationForm.get('password');
  }

  get email() {
    return this.registerationForm.get('email');
  }

  get mobile() {
    return this.registerationForm.get('mobile');
  }

  get profile() {
    return this.registerationForm.get('profile');
  }

  changeState() {
    this.status = '';
  }
}
