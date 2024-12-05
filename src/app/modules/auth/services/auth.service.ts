import { Injectable } from '@angular/core';
import { endpoints } from '../../../../endpoints/endpoints';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister } from '../models/auth.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL = endpoints.Auth;
  registerURL = endpoints.Register;
  constructor(private http:HttpClient) { }

  register(registerData:IRegister) : Observable<any>
  {
    debugger
    return this.http.post<IRegister>(`${this.registerURL}/RegisterUser`,registerData);
  }

  login(loginData:ILogin) : Observable<any>
  {
    return this.http.post<ILogin>(`${this.loginURL}/Login`,loginData);
  }
}
