import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionStorageService } from '../services/session-storage.service';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  UrlTree,
  UrlSegment,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UnLoggedUserGuard
  implements CanActivate, CanActivateChild, CanLoad
{
  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): boolean | Observable<boolean> | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isLoggedUser(route, state);
  }

  isLoggedUser(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    let successLogin = this.sessionStorageService.getItem('user_logged');
    if (successLogin === 'true') {
      this.router.navigate(['dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
