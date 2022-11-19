import { async } from 'rxjs';
import { UserService } from './../user-service.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Group from '../Group';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  senderId: string = '';
  receiverId: string = '';
  isGroupSetting: Boolean = false;
  getMessages: Map<string, string> = new Map();
  group: Group = new Group();
  contactNames: Map<string, string> = new Map();
  state: string = '';
  userId: string = '';
  isAdmin: Boolean = false;
  status: string = '';

  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  groupSettingForm: FormGroup = new FormGroup({
    participent: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router) {
  }

  @Input()
  friendName: string = "";

  @Input()
  friendProfile: string = "";

  @Input()
  groupName: string = "";

  @Input()
  groupId: string = "";


  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || "";

    if (this.userId != null) {
      this.senderId = this.userId;
      // console.log("sender: " + this.senderId);

      if (this.friendName != '') {
        this.getMessages.clear();
        this.userService.checkUser(this.friendName).subscribe({
          next: (receiver) => {
            this.receiverId = receiver._id;
            console.log(receiver);
            this.status = receiver.status;
            var contacts:Array<string> = receiver.contacts.toString().split(',');
            if(contacts[0]==''){
              contacts.slice(0,1);
            }
            if(!contacts.includes(this.userId)){
              contacts.push(this.userId);
              receiver.contacts = contacts;
              console.log(contacts);
              this.userService.updateUser(this.receiverId,this.friendName,receiver.email,receiver.password,receiver.mobile,receiver.contacts,receiver.groups).subscribe({
                next:data=>{
                  console.log(data);
                },
                error:err=>{
                  console.log(err);
                }
              })
            }

            this.userService.getConversations(this.senderId).subscribe({
              next: (data) => {
                console.log("Conversations: " + data[0]);
                data.forEach((con: any) => {
                  if (con.members[1] == this.receiverId || con.members[0] == this.receiverId) {
                    this.userService.getMessages(con._id).subscribe({
                      next: (messages) => {
                        // console.log(messages);
                        messages.forEach((msg: any) => {
                          // console.log("Messages :" + msg);
                          this.getMessages.set(msg.createdAt + ',' + msg.sender, msg.text);
                          // console.log(this.getMessages);
                          this.getMessages = new Map([...this.getMessages.entries()].sort());
                        });
                      }
                    })
                  }
                });
              },
              error: (err) => {
                console.log(err);
              }
            })
          }
        })
      }
      else if (this.groupName != null) {
        this.userService.getConversations(this.groupId).subscribe({
          next: (data) => {
            console.log("Conversations: " + data[0]);
            data.forEach((con: any) => {
              this.userService.getMessages(con._id).subscribe({
                next: (messages) => {
                  console.log(messages);
                  messages.forEach((msg: any) => {
                    console.log("Messages :" + msg);
                    this.userService.viewUser(msg.sender).subscribe({
                      next: (sender) => {
                        this.getMessages.set(msg.createdAt + ',' + msg.sender + ',' + sender.userName, msg.text);
                        console.log(this.getMessages);
                        this.getMessages = new Map([...this.getMessages.entries()].sort());
                      },
                      error: (err) => {
                        console.log(err);
                      }
                    });
                  });
                }
              })
            });
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
      // console.log("Data from parent", this.friendName);
    }

    if (this.groupId != null) {

      this.receiverId = "";
      this.getMessages.clear();
      this.contactNames.clear();

      // console.log("Inside group id checking of ngoninit.")
      this.userService.getGroup(this.groupId).subscribe({
        next: (data) => {
          // console.log(data);
          this.group = data[0];
          console.log(this.group.admins);
          console.log(this.userId);
          if (this.group.admins.indexOf(this.userId) > -1) {
            this.isAdmin = true;
          }
          console.log(this.isAdmin);
          var admins = this.group.admins[0].split(',');
          var members = this.group.members.toString().split(',');
          members.forEach((member) => {
            console.log(member);
            this.userService.viewUser(member).subscribe({
              next: user => {
                if (admins.includes(member)) {
                  member = member + ",1";
                }
                else {
                  member = member + ",0";
                }
                this.contactNames.set(member, user.userName);
                // console.log("Contact names: "+this.contactNames);
              },
              error: err => {
                console.log(err);
              }
            })
          });
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

  ngOnChanges() {
    this.ngOnInit();
  }

  onSubmit() {
    console.log("Data from parent", this.friendName);
    console.log(this.receiverId);
    let conId: string = '';

    this.userService.getConversations(this.senderId).subscribe({
      next: (cons) => {
        if (this.receiverId != "") {
          console.log(cons);
          cons.forEach((con: any) => {
            if (con.members[1] === this.receiverId || con.members[0] === this.receiverId) {
              conId = con._id;
            }
          });

          if (cons.length != 0 && conId != '') {
            // conId = con._id;

            this.userService.addMessage(conId, this.senderId, this.messageForm.value.message).subscribe({
              next: (data) => {
                console.log(data);
                this.messageForm.reset();

                this.ngOnInit();

              },
              error: (err) => {
                console.log(err);
              }
            })
          }
          else {
            this.userService.addConversation(this.senderId, this.receiverId).subscribe({
              next: (data) => {
                console.log(data);
                this.userService.addMessage(data._id, this.senderId, this.messageForm.value.message).subscribe({
                  next: (data) => {
                    console.log(data);
                    this.messageForm.reset();
                    this.ngOnInit();
                  },
                  error: (err) => {
                    console.log(err);
                  }
                })
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
        }
        else {
          console.log("Group Id: " + this.groupId);
          cons.forEach((con: any) => {
            if (con.members[1] === this.groupId || con.members[0] === this.groupId) {
              conId = con._id;
            }
          });
          if (cons.length != 0 && conId != '') {
            // conId = con._id;
            this.userService.addMessage(conId, this.senderId, this.messageForm.value.message).subscribe({
              next: (data) => {
                console.log(data);
                this.messageForm.reset();
                this.ngOnInit();
              },
              error: (err) => {
                console.log(err);
              }
            })
          }
          else {
            this.userService.addConversation(this.senderId, this.groupId).subscribe({
              next: (data) => {
                console.log(data);
                this.userService.addMessage(data._id, this.senderId, this.messageForm.value.message).subscribe({
                  next: (data) => {
                    console.log(data);
                    this.messageForm.reset();
                    this.ngOnInit();
                  },
                  error: (err) => {
                    console.log(err);
                  }
                })
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onGroupSetting() {
    this.isGroupSetting = true;
    console.log(this.group.admins, this.userId);
    if (this.group.admins.toString().split(',').includes(this.userId)) {
      this.isAdmin = true;
    }
    console.log(this.isAdmin);
    console.log("Group setting is called.");
    // console.log(this.contactNames);
    // console.log(this.group.members);
  }


  addGroupName() {

    var participent = this.groupSettingForm.value.participent;
    this.groupSettingForm.reset();
    console.log(participent);
    var present = false;
    for (var map of this.contactNames) {
      if (map[1] == participent) {
        present = true;
        this.state = 'This participent is already added.'
        break;
      }
    }
    if (!present) {
      this.userService.checkUser(participent).subscribe({
        next: data => {
          console.log(data.contacts);
          var array: Array<string> = data.groups.toString().split(',');
          if (array[0] == '') {
            array.splice(0, 1);
            data.groups = array;
          }
          this.group.members.push(data._id);
          this.contactNames.set(data._id + "0", participent);
          console.log(this.group);
          this.userService.updateGroup(this.group._id, this.group.groupName, this.group.members, this.group.admins).subscribe({
            next: (data1) => {
              console.log(data1);
            },
            error: (err) => {
              console.log(err);
            }
          });
          data.groups.push(this.group._id);
          console.log(data.groups);
          console.log("Admin has added member in group and update user is called");
          console.log(data.contacts);
          this.userService.updateUser(data._id, data.userName, data.email, data.password, data.mobile, data.contacts, data.groups).subscribe({
            next: data => {
              console.log(data);
              this.ngOnInit();
            },
            error: err => {
              console.log(err);
            }
          })
        },
        error: err => {
          console.log(err);
          this.state = "Please enter valid username."
        }
      });
    }
  }


  deleteMemberOfGroup(memberName:string){
    console.log(memberName+" is selected for delete.");
    this.userService.checkUser(memberName).subscribe({
      next:user=>{
        var array : Array<string> = user.groups.toString().split(',');

        console.log(array);
        var index=0;
        for(var v of array.entries()){
          
          console.log(v);
          if(v[1]==this.groupId){
            
            array.splice(index,1);
            user.groups = array;
            console.log("Message from delete contact"+user.groups);
            break;
          }
          index++;
        }
        array = this.group.members.toString().split(",");
        for(var v of array.entries()){
          console.log(v);
          if(v[1]==user._id){
            array.splice(v[0],1);
            this.group.members = array;
            break;
          }
        }
        array = this.group.admins.toString().split(",");
        for(var v of array.entries()){
          console.log(v);
          if(v[1]==user._id){
            array.splice(v[0],1);
            this.group.admins = array;
            break;
          }
        }

        if(array.length<1){
          var array1 = this.group.members.toString().split(",");
          if(array1[0]==""){
            array1.slice(0,1);
          }
          console.log("inside if ", array1);

          if(array1.length>0){
            array.push(array1[0]);
            this.group.admins = array;
          }
          else{
            console.log("No members are present");
            this.userService.deleteGroup(this.groupId).subscribe({
              next:data=>{
                console.log(data);
              },
              error:err=>{
                console.log(err);
              }
            })
          }
        }
        else{

        }
        this.userService.updateUser(user._id,user.userName,user.email,user.password,user.mobile,user.contacts,user.groups).subscribe({
          next:data=>{
            console.log(data);
          },
          error:err=>{
            console.log(err);
          }
        })
        this.userService.updateGroup(this.group._id,this.group.groupName,this.group.members,this.group.admins).subscribe({
          next:data=>{
            console.log(data);
            this.contactNames.delete(user._id);
            this.ngOnInit();
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
  }

  createAdmin(userId:string){
    console.log("Create admin button is clicked");
    console.log(userId);
    this.group.admins.push(userId);
    console.log(this.group.admins);
    this.userService.updateGroup(this.group._id,this.group.groupName,this.group.members,this.group.admins).subscribe({
      next:data=>{
        console.log(data);
        this.contactNames.delete(userId+"0");
        this.ngOnInit();
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  closeSetting() {
    this.isGroupSetting = false;
  }

}
