import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../../../../endpoints/endpoints';
import { ILogin } from '../models/ILogin';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  loginURl = endpoints.Auth;
  constructor(private http:HttpClient) { }

  login(loginData:ILogin) : Observable<any>
  {
    return this.http.post<ILogin>(`${this.loginURl}/Login`,loginData);
  }
}