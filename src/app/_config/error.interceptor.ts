import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../_service/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if ([404].indexOf(err.status) !== -1) { 
        location.replace('404');
      }
      if ([401, 403].indexOf(err.status) !== -1) {
        this.authenticationService.logout();
        location.replace('home');
      }
      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    }));
  }
}
