import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { Router } from '@angular/router';
import { ILogin } from '../../models/auth.models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  roleName = 'Admin';
  loginData: ILogin | undefined;
  token: any;
  loginForm: FormGroup | any;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]]
    });
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      const userName = this.loginForm.get('UserName').value;
      const password = this.loginForm.get('Password').value;
      this.loginData = this.convertToLoginModal(userName, password);
      this.authService.login(this.loginData).subscribe({
        next: (res: any) => {
          this.token = res.token;
          this.localStorageService.setItem('token', this.token);
          this.notificationService.success("Login Successfully.");
          this.router.navigate(['admin/']);
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  convertToLoginModal(userName: string, password: string) {
    const loginModal: ILogin = {
      UserName: userName,
      Password: password,
      RoleName: this.roleName
    };
    return loginModal;
  }

  resetForm() {
    this.loginForm.reset();
  }
}