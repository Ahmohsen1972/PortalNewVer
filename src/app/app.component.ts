import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { Meta, Title } from '@angular/platform-browser';
import { AuthService } from './core/services/auth.service';
import { ApiResponse } from './core/interfaces/api-response';
import { Component, HostListener, Inject, OnDestroy } from '@angular/core';
import { LocalStorageService } from './core/services/local-storage.service';
import { SessionStorageService } from './core/services/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  successLogin: string;
  opened: boolean = true;
  textDirection: string;
  currentLang: string;

  private subscriptions: Subscription[] = [];
  constructor(
    private authService: AuthService,
    private localstorageservice: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    @Inject(DOCUMENT) private document: Document,
    private bnIdle: BnNgIdleService,
    private router: Router,
    private title: Title,
    private meta: Meta,
  ) {
    this.successLogin = this.sessionStorageService.getItem('user_logged');
    this.getSessionTimeOutValue();
  }

  ngOnInit(): void {
    this.title.setTitle('Ithmaar Solutions');
    this.meta.updateTag({ description: 'Angular SSR Implementing' });
    this.getDirection(); // to when reload incase arablic language
  }

  getSessionTimeOutValue() {
    /*
    this.bnIdle
      .startWatching(
        this.sessionStorageService.getItem('sessionTimeOut') != null
          ? this.sessionStorageService.getItem('sessionTimeOut')
          : 1500,
      )
      .subscribe((result) => {
        if (result) {
          let rolKey = this.sessionStorageService.getItem('role_key');
          this.subscriptions.push(
            this.authService.logOut().subscribe((res: ApiResponse) => {
              if (res.success) {
                this.sessionStorageService.clear();
                this.localstorageservice.clear();
                if (rolKey != null && rolKey == 2) {
                  this.router.navigate(['/login/customer']);
                  (<any>window).Intercom('shutdown'); // to hide chat icon after log out
                } else this.router.navigate(['/']);
              }
            }),
          );
        }
      });
      */
  }

  getDirection() {
    this.currentLang = this.localstorageservice.getItem('currentLang');
    if (this.currentLang != null) {
      const DIR = this.currentLang === 'AR' ? 'rtl' : 'ltr';
      const TXT_ALIGNMENT = this.currentLang === 'AR' ? 'right' : 'left';
      this.document.getElementById('app-body-id').style.direction = DIR;
      this.document.getElementById('app-body-id').style.textAlign =
        TXT_ALIGNMENT;
      const HTML = this.document.getElementsByTagName('html')[0] as HTMLElement;
      HTML.dir = DIR;
    }
  }

  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  resetTimer() {
    this.authService.notifyUserAction();
  }

  ngOnDestroy(): void {
    // this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
