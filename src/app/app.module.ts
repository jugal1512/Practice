import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthModule } from './modules/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { ErrorInterceptorService } from './core/interceptors/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:10000,
      positionClass:'toast-top-right',
      preventDuplicates:true,
      progressBar:true,
    })

  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }