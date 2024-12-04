import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  token : string | undefined;
  constructor(private localstorageService : LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.localstorageService.getItem('token');
    if(this.token)
    {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${this.token}` },
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}