import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../../models/auth.modals';
import { SignInService } from '../../services/sign-in.service';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{
  
  roleName = 'Admin';
  loginData : ILogin | undefined;
  user : any;
  loginForm : FormGroup | any;
  constructor(private fb:FormBuilder,private signInService:SignInService,private localStorageService:LocalStorageService,private notificationService:NotificationService){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserName: ['',Validators.required],
      Password: ['',[Validators.required,Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]]
    });
  }

  onSubmit()
  {
    if(this.loginForm?.valid)
    {
      const userName = this.loginForm.get('UserName').value;
      const password = this.loginForm.get('Password').value;
      this.loginData = this.convertToLoginModal(userName,password);
      this.signInService.login(this.loginData).subscribe((res:any)=>{
        this.user = res;
        this.localStorageService.setItem('user',this.user);
        this.notificationService.success("Login Successfully.");
      },
      (error)=>{
        this.notificationService.error(error.status);
      });
    }
    else
    {
      this.loginForm.markAllAsTouched();
    }
  }

  convertToLoginModal(userName:string,password:string)
  {
    const loginModal : ILogin = {
      UserName : userName,
      Password : password,
      RoleName : this.roleName
    };
    return loginModal;
  }

  resetForm()
  {
    this.loginForm.reset();
  }

}