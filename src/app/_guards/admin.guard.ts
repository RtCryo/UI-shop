import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthenticationService } from '../_service/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const currentUser = this.authenticationService.currentUserValue;
    return this.authenticationService.isAdmin(currentUser).pipe(map((response) => {
      if (response) {
          return true;
      }
      this.router.navigate(['/home']);
      return false;
  }), catchError(() => {
      this.router.navigate(['/home']);
      return of(false);
  }));
  }
}
