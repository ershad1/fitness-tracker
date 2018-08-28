import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
