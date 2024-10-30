import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEndpointService } from './http-endpoint.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token?: string;

  _userActionOccured: Subject<void> = new Subject();
  get userActionOccured(): Observable<void> {
    return this._userActionOccured.asObservable();
  }

  constructor(
    private sessionStorage: SessionStorageService,
    private endpoint: HttpEndpointService,
  ) {}

  notifyUserAction() {
    this._userActionOccured.next();
  }

  logOut() {
    let params = [{ usrKey: this.sessionStorage.getItem('user_Id') }];
    return this.endpoint.getBy(`portal/logout`, params, 'req');
  }

  getToken() {
    this.token = this.sessionStorage.getItem('access_token');
    return this.token;
  }
  getIsAuth() {
    this.token = this.sessionStorage.getItem('access_token');
    return this.token != null ? true : false;
  }
}
