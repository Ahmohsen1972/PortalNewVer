import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private sessionStorage: SessionStorageService) {}

  handleError(error: HttpErrorResponse) {
    let refresh_token = this.getRefreshTokenFromResponse(error.error.token);
    if (refresh_token != null)
      this.sessionStorage.setItem('access_token', refresh_token);
  }

  getRefreshTokenFromResponse(response: string): string | null {
    if (response != null) {
      let splitResponse = response.split(' ', 2);
      return splitResponse[1];
    }
    return null;
  }
}
