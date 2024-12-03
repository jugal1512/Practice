import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../../models/auth.modals';
import { Observable } from 'rxjs';
import { endpoints } from '../../../../endpoints/endpoints';

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