import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import  User  from './user';
import { Observable } from 'rxjs';


export const httpOption={
  headers: new HttpHeaders().append('Content-Type','application/json')
}
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = "http://localhost:5000";
  constructor(private httpClient:HttpClient) { }
  addUser(user:User):Observable<any>{
    console.log("Inside Student service add method");
    return this.httpClient.post<HttpResponse<any>>(this.url+"/users/addUser/",JSON.stringify(user),httpOption)
  }
}
