import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string = '';
    this.authService.user
      .subscribe((user) => {
        if (user?.token) {
          token = user.token;
        }
      })
      .unsubscribe();

    if (!token) return next.handle(req);

    const modifiedReq = req.clone({
      params: new HttpParams().set('auth', token),
    });
    return next.handle(modifiedReq);
  }
}
