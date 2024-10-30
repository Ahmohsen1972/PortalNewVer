import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { GenericPopupComponent } from 'app/shared/components/generic-popup/generic-popup.component';
import { LocalStorageService } from '../services/local-storage.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';
import { TransferDataService } from '../services/transfer-data.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private authService: AuthService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private transferDataService: TransferDataService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle specific error status codes
        if (error.status === 401) {
          if (error.error?.errorType === 'Legal') {
            // Handle specific 401 error with errorType "Legal"
            this.handleLegalError(error);
          } else {
            // Handle generic 401 error
            this.handleUnauthorizedError(request, next);
          }
        } else {
          // Handle other errors
          this.handleGenericError(error);
        }
        return throwError(error);
      }),
    );
  }

  private handleLegalError(error: HttpErrorResponse): void {
    const dialogRef = this.dialog.open(GenericPopupComponent, {
      width: '500px',
      panelClass: 'delete-popup',
      data: {
        message: error.error.errors[0],
        title: 'Error',
        clearData: true,
      },
      direction:
        this.localStorageService.getItem('currentLang') === 'AR'
          ? 'rtl'
          : 'ltr',
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  private handleUnauthorizedError(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized error
          this.errorService.handleError(error); // Now 'error' is defined
          const clonedRequest = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${this.authService.getToken()}`,
            ),
          });
          return next.handle(clonedRequest); // Retry the request with the new token
        } else {
          // For other errors, propagate the error
          return throwError(() => error);
        }
      })
    );
  }
  

  private handleGenericError(error: HttpErrorResponse): void {
    if (error.error?.errors) {
      this.dialog.open(GenericPopupComponent, {
        width: '500px',
        panelClass: 'delete-popup',
        data: {
          message: error.error.errors[0],
          title: 'Error',
        },
        direction:
          this.localStorageService.getItem('currentLang') === 'AR'
            ? 'rtl'
            : 'ltr',
      });
    }
  }
}
