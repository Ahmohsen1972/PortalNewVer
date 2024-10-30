import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppComponent } from './app.component';
import { QuicklinkModule } from 'ngx-quicklink';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryModule } from './features/entry/entry.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserModule,
} from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { environment } from 'environments/environment.prod';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GraphQLModule } from './graphql.module';
import { DatePipe } from '@angular/common'; // Import DatePipe

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MatDialogModule,
    ToastrModule.forRoot(), // ToastrModule added
    QuicklinkModule,
    GraphQLModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    AppRoutingModule,
    EntryModule,
    NgxSpinnerModule,
    FontAwesomeModule,
  ],
  providers: [
    BnNgIdleService,
    DatePipe,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
