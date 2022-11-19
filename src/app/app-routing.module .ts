import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RemoveUserComponent } from './remove-user/remove-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {
    path: '',pathMatch: 'full', redirectTo:'login'
  },
  {
    path: 'registeration', component: AddUserComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'viewProfile', component: ViewUserComponent
  },
  {
    path:'removeUser', component: RemoveUserComponent
  },
  {
    path:'updateUser', component: UpdateUserComponent
  },
  {
    path:'logout', component: LogoutComponent
  },
  {
    path:'home', component: HomeComponent
  },
  {
    path:'chat', component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
