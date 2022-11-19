import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userName:any;
  userProfile:any;
  title = 'CheetChat';
  isLoggedIn(){
    // console.log("inside isLoggedIn");
    if(sessionStorage.getItem('userId')!=null){
      this.userProfile = sessionStorage.getItem('userProfile');
      this.userName = sessionStorage.getItem('userName');
      // console.log(this.userProfile);
      return true;
    }
    return false;
  }
  // <i class="fa-solid fa-user"></i>
}
