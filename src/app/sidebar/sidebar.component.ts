import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs';
import User from '../user';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private userId: string = '';
  state: String = "";
  user: User = new User();
  friendProfile: any;
  friend: any;
  isGroup: Boolean = false;
  conversation: Array<any> = [];
  friends: Array<string> = [];
  groupNames: Array<string> = [];
  groups: Map<string, string> = new Map();
  friendsNP: Map<string, string> = new Map();
  searchFriends: Map<string, string> = new Map();
  search: Boolean = false;
  constructor(public userService: UserService, private router: Router) {
  }

  //for getting contact
  @Output() emitter = new EventEmitter();

  //for getting group
  @Output() emitter1 = new EventEmitter();

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  addForm: FormGroup = new FormGroup({
    friendName: new FormControl('', Validators.required),
  });

  groupForm: FormGroup = new FormGroup({
    groupName: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || "";
    // console.log("Inside update user component method.");
    // console.log(this.userId);
    if (this.userId != '') {
      this.userService.viewUser(this.userId).subscribe({
        next: data => {
          // console.log(data);
          this.user = data;
          if (this.user.contacts.toString() != '') {
            this.friends = this.user.contacts.toString().split(',');

            for (let friendId of this.friends) {
              var name: string = "";
              var profile: string = "";

              this.userService.viewUser(friendId).subscribe({
                next: (data) => {
                  // console.log(data);
                  name = data.userName;
                  profile = data.profile;
                  this.friendsNP.set(name, profile);
                },
                error: err => {
                  console.log(err);
                }
              })

              // console.log(friend);

            }
            // console.log("Success");
          }
          this.user.groups = this.user.groups.toString().split(',');
          // console.log("Befor for loop"+this.user.groups);
          if (this.user.groups.length > 0) {
            for (let group of this.user.groups) {
              this.userService.getGroup(group.toString()).subscribe({
                next: data => {
                  // console.log(data[0]);
                  this.groups.set(group.toString(), data[0].groupName);
                },
                error: err => {
                  console.log(err);
                }
              })
            }
            // console.log(this.groups);
          }
        },
        error: err => {
          console.log(err);
          // console.log("Oppps! Not able to found user.");
        }
      })
    }

    console.log(this.friendsNP);

  }

  getContacts() {
    this.isGroup = false;
    this.emitter1.emit(['', '']);
    // console.log(this.user.contacts);
  }

  ngOnChanges() {

  }

  getGroups() {
    this.isGroup = true;
    this.emitter.emit(['','']);
    // console.log(this.user.groups);
    // console.log(this.groups);
  }


  onSearch() {
    console.log("Inside on search and outside if.");
    if (this.searchForm.value.name != '') {
      console.log("Inside on search.");

      var name = this.searchForm.value.name;
      name = name.toLowerCase();
      name = name.charAt(0).toUpperCase() + name.slice(1);

      this.searchFriends.clear();
      this.friendsNP.forEach((value: string, key: string) => {
        if (key.indexOf(name) != -1) {
          this.search = true;
          this.searchFriends.set(key, value);
        }

      });
    }
    else {
      this.search = false;
    }
  }

  addContact() {
    if (this.addForm.valid) {

      console.log("Inside add contact");

      if (this.addForm.value.friendName != sessionStorage.getItem('userName')) {
        var array = this.user.contacts.toString().split(",");
        console.log(array);
        this.userService.checkUser(this.addForm.value.friendName).subscribe({
          next: data => {
            // console.log(data);
            // console.log("Is array contain this name?",array.includes(this.addForm.value.friendName));
            // console.log(data);
            if (array.includes(this.addForm.value.friendName)) {
              this.state = "This user is already in your contact";
            }
            var flag = (!array.includes(this.addForm.value.friendName) && this.addForm.valid);
            // console.log(flag);
            if (flag) {
              if (array[0] == '') {
                array.slice(0,1);
              }
              array.push(data._id);
              this.user.contacts = array;
              console.log(this.user.contacts);
              this.userService.updateUser(
                this.userId,
                this.user.userName,
                this.user.email,
                this.user.password,
                this.user.mobile,
                this.user.contacts,
                this.user.groups,
                this.user.messages
              ).subscribe(
                {
                  next: data => {
                    this.addForm.reset();
                    this.ngOnInit();
                    // this.router.navigate(['/chat']).then(() => { this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }; })
                  },
                  error: error => {
                    if (error.status == 401) {
                      console.log("not able to register.");
                    }
                  }
                }
              );
            }
            console.log("Success");
          },
          error: err => {
            // console.log(err);
            this.state = "This user is not available";
            console.log("Oppps! Not able to found user.");
          }
        })
      }
      else {
        this.state = "Can't add Own UserName as friend Name";
        console.log("Can't add Own UserName as friend Name");
      }
    }
  }

  get name() {
    return this.searchForm.get('name');
  }

  get friendName() {
    return this.addForm.get('friendName');
  }

  changeState() {
    this.state = '';
  }

  getChat(friend: any) {
    this.emitter.emit(friend);
  }

  getGroupChat(gname: any) {
    this.emitter1.emit(gname);
    // console.log(gname);
  }

  deleteContact(name: string) {
    console.log(name);
    this.userService.checkUser(name).subscribe({
      next: (user) => {
        // var index = this.friends.findIndex(user._id);
        console.log(user._id);
        console.log(this.friends);
        const index = this.friends.indexOf(user._id, 0);
        if (index > -1) {
          this.friends.splice(index, 1);
        }
        console.log(this.friends);
        this.user.contacts = this.friends;
        this.friendsNP.delete(user.userName);
        this.searchFriends.delete(user.userName);
        this.userService.updateUser(
          this.userId,
          this.user.userName,
          this.user.email,
          this.user.password,
          this.user.mobile,
          this.user.contacts,
          this.user.groups
        ).subscribe({
          next: () => {
            console.log('Contact is removed');
            this.ngOnInit();
          },
          error: () => {
            console.log("Contact can't be removed");
          }
        })

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createGroup() {
    var groupName = this.groupForm.value.groupName;
    
    if (!Array.from(this.groups.values()).includes(groupName)) {
      this.userService.addGroup(this.userId, groupName).subscribe({
        next: data => {
          console.log(data);
          if (this.user.groups[0] == "") {
            this.user.groups.slice(0,1);
          }
          this.user.groups.push(data._id);
          this.groups.set(data._id, groupName);
          console.log(this.user.groups);
          this.userService.updateUser(this.userId, this.user.userName, this.user.email, this.user.password, this.user.mobile, this.user.contacts, this.user.groups).subscribe({
            next: data => {
              console.log(data);
            },
            error: err => {
              console.log(err);
            }
          })
          this.groupForm.reset();
        },
        error: err => {
          console.log(err);
        }
      })
    }else{
      this.state = "This group name is already taken.";
    }

  }

}
