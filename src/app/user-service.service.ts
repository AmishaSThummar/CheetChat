import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import  User  from './user';
import { Observable } from 'rxjs';
import Conversation from './Conversation';
import Message from './Message';


// export const httpOption={
//   headers: new HttpHeaders().append('Content-Type','multipart/form-data')
// }


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:5001";
  headers = new HttpHeaders().set('Content-Type','application/json');


  constructor(private httpClient:HttpClient) { }


  loginUser(userName:string, password:string):Observable<any>{

    let formData = new FormData();
    formData.append('userName', userName);
    formData.append('password', password);
    // console.log("Inside user service :"+formData.get('userName')+"\n" + formData.get('password'));

    return this.httpClient.post<HttpResponse<any>>(this.url+'/users/loginUser/', formData);
  }

  
  addUser(userName:string,email:string,password:string,mobile:Number,image:File):Observable<any>{
    console.log("Inside Student service add method");
    // console.log(userName,email,password,mobile);
    var formData = new FormData();
    formData.append('userName',userName);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('mobile',mobile.toString());
    console.log("Inside service:");
    // console.log(image);
    // formData.append('image',image);
    
    formData.append('profile',image);

    // return this.httpClient.post<HttpResponse<any>>(this.url+"/users/addUser/",JSON.stringify(user),httpOption);
    return this.httpClient.post<User>(this.url+'/users/addUser/', formData ,{
      reportProgress: true,
      observe: 'events',
    });
  }

  viewUser(userId:string):Observable<any>{
    
    // console.log("Inside Student service view method");
    // console.log(userId);
    return this.httpClient.get<HttpResponse<any>>(this.url+'/users/viewUser/'+userId);
  }

  updateUser(userId:string,userName:string,email:string,password:string,mobile:Number,contacts:Object=[],groups:Object=[],messages:Object=[],status:string ="online"):Observable<any>{
    
    var formData = new FormData();
    formData.append('userName',userName);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('mobile',mobile.toString());
    // formData.append('profile',image);
    formData.append('contacts',contacts.toString());
    formData.append('messages',messages.toString());
    formData.append('status',status);
    formData.append('groups',groups.toString());
    // console.log(groups + " Inside userservice");

    return this.httpClient.put<HttpResponse<any>>(this.url+'/users/updateUser/'+userId, formData);
  }

  removeUser(userId:string):Observable<any>{
    console.log("Inside Student service remove method");
    console.log(this.url+'/users/removeUser/'+userId);
    return this.httpClient.delete<HttpResponse<any>>(this.url+'/users/removeUser/'+userId);
  }

  uploadImage(image:File):Observable<any>{

    const formData = new FormData();
    

     return this.httpClient.post(this.url+'/users/addUser/', formData);
  }

  checkUser(userName:string):Observable<any>{
    return this.httpClient.get<HttpResponse<any>>(this.url+"/users/findUser/"+userName);
  }

  getAllUser():Observable<any>{
    return this.httpClient.get<HttpResponse<any>>(this.url+"/users/allContacts");
  }

  getConversations(userId:string):Observable<any>{
    return this.httpClient.get<HttpResponse<any>>(this.url+'/conversations/'+userId);
  }

  getMessages(conversationId:string):Observable<any>{
    return this.httpClient.get<HttpResponse<any>>(this.url+'/messages/'+conversationId);
  }

  addConversation(senderId:string, receiverId:string):Observable<any>{
    // console.log("Inside add conversation" + senderId + receiverId);
    var formData = new FormData();
    formData.append('senderId',senderId);
    formData.append('receiverId',receiverId);

    return this.httpClient.post<Conversation>(this.url+'/conversations/', formData);
  }

  addMessage(conversationId:string, sender:string, text:string):Observable<any>{
    
    var formData = new FormData();
    formData.append('conversationId',conversationId);
    formData.append('sender',sender);
    formData.append('text',text);

    return this.httpClient.post<Message>(this.url+'/messages/', formData);
  }


  addGroup(userId:string,groupName:string):Observable<any>{
    console.log("Inside addGroup service");
    let formData = new FormData();
    formData.append('groupName', groupName);
    return this.httpClient.post<HttpResponse<any>>(this.url+'/groups/createGroup/'+userId,formData);
  }

  getGroup(groupId:string):Observable<any>{
    // console.log("Inside getGroup service");
    return this.httpClient.get<HttpResponse<any>>(this.url+'/groups/getGroup/'+groupId);
  }

  updateGroup(groupId:string,groupName:string,members:Array<string>,admins:Array<string>):Observable<any>{
    console.log("Inside update group service");
    console.log(groupId,groupName,members,admins);
    var formData = new FormData();
    formData.append("groupName",groupName);
    formData.append("members",members.toString());
    formData.append("admins",admins.toString());
    return this.httpClient.put<HttpResponse<any>>(this.url+'/groups/updateGroup/'+groupId, formData);
  }

  deleteGroup(groupId:string):Observable<any>{
    return this.httpClient.delete<HttpResponse<any>>(this.url+'/groups/removeGroup/'+groupId);
  }
}
