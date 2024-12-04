import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private notificationSetvice:NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error : HttpErrorResponse)=>{
        if(error)
        {
          switch(error.status)
          {
            case 401:
              this.notificationSetvice.error(`${error.status} Unauthorize User.`);
              break;
            case 500:
              this.notificationSetvice.error(`${error.status} ${error.message}`);
              break;
            case 404:
              this.notificationSetvice.error(`${error.status} Data already Exists.`);
              break;
            default:
              break;
          }
        }
        return throwError(()=>error);
      })
    )
  }
}