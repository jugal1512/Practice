import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  roleName = 'Admin';
  registerData: IRegister | undefined;
  registerForm: FormGroup | any;
  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private notificationService: NotificationService,
              private router:Router
  ) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]]
    });
  }

  onSubmit() {
    if (this.registerForm?.valid) {
      debugger
      const userName = this.registerForm.get('UserName').value;
      const email = this.registerForm.get('Email').value;
      const password = this.registerForm.get('Password').value;
      this.registerData = this.convertToRegisterModal(userName, email, password);
      this.authService.register(this.registerData).subscribe({
        next: (res: any) => {
          debugger
          this.notificationService.success(res.message);
          this.router.navigate(['/']);
        }
      });
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

  convertToRegisterModal(userName: string,email:string, password: string) {
    const loginModal: IRegister = {
      UserName: userName,
      Email: email,
      PasswordHash: password,
      RoleName: this.roleName
    };
    return loginModal;
  }

}
