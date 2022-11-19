import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from './user';
export const httpOption={
  headers: new HttpHeaders().append('Content-Type','multipart/form-data')
}
@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private url = "http://localhost:5001";
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient:HttpClient) { }
  getConversation(userId:string):Observable<any>{
    return this.httpClient.get<HttpResponse<any>>(this.url+"/conversations/getConversion/"+userId);
  }

  saveConversation():Observable<any>{
    var conversation = new User();
    return this.httpClient.post<HttpResponse<any>>(this.url+"/conversations/newConversation",JSON.stringify(conversation),httpOption);
  }
}
