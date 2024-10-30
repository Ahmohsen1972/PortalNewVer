import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    protected authService: AuthService,
    @Inject(PLATFORM_ID) private _platformId: Object,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.getIsAuth()) {
      return next.handle(
        request.clone({
          headers: request.headers.set(
            'Authorization',
            `Bearer ${this.authService.getToken()}`,
          ),
        }),
      );
    }
    return next.handle(request);
  }
}
