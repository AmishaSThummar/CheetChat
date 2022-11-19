import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  friendName:string='';
  friendProfile:string='';
  groupName: string = '';
  groupId: string = '';

  
  constructor() { }

  ngOnInit(): void {
  }

  send(e:any){
    // console.log("I am called after on sidebar something is clicked");
    // console.log(e);

    this.friendName = e[0].toString();
    this.friendProfile = e[1].toString();
  }

  sendGroupName(e:any){
    this.groupName = e[1];
    this.groupId = e[0];
  }

}
