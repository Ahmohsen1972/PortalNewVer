import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as env from 'environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { CoreService } from 'app/core/services/core.service';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { FinancialProgComponent } from 'app/features/entry/financial-prog/financial-prog.component';
import { DOCUMENT } from '@angular/common';
import { UserMenuTree } from 'app/core/interfaces/UserMenuTree';
declare var SockJS;
declare var Stomp;
@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('notification', { static: true }) notification;
  userIsadmin: string;
  isWhiteMode = false;
  userType: string;
  userId: number;
  roleKey: number;
  faBars = faBars;
  menuOpened = false;
  isOpen = false;
  userFullName: string;
  textDir: string;
  currentLang: string;
  imageSrc: string;
  translateBtnToggle: boolean = true;
  public stompClient;
  url = '';
  pageNumber = 0;
  pageSize = 5;
  unReadCount: number;
  notificationList: String[];
  modules: UserMenuTree[];
  private langDirection: { [k: string]: string } = {};
  private subscriptions: Subscription[] = [];
  public allLangs: string[] = [];
  allLanguages: string;
  pageLoad: boolean = false;
  newRequest: boolean = false;
  updateRequest: boolean = false;
  staticTranslation: { [k: string]: string } = {};
  receivedData: string;
  lan: string;
  showNotificationCounter = true;
  languageKeyName: Array<{ langKey: string; langName: string }> = [];
  inEntry: boolean = false;
  newReport: boolean = false;
  updateReport: boolean = false;
  constructor(
    private sessionStorageService: SessionStorageService,
    private authService: AuthService,
    private toast: ToastrService,
    private transferDataService: TransferDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private coreService: CoreService,
    @Inject(DOCUMENT) private document: Document,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    private localstorageservice: LocalStorageService,
  ) {
    this.url = env.environment.baseUrl;
    this.userId = this.sessionStorageService.getItem('user_Id');
    this.roleKey = this.sessionStorageService.getItem('role_key');
  }

  getStaticTranslation() {
    /*
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('languages/all')
        .subscribe((data: ApiResponse) => {
          this.ithmaarPortalService.log(
            'language data from header :',
            data.payload,
          );
          data.payload.forEach((lang) => {
            if (lang['langIsDefault'] === 'T') {
              this.currentLang = lang['langsShortName'];
            }

            this.langDirection[lang['langsShortName']] = lang['langDir'];
            this.languageKeyName.push({
              langKey: lang['langsShortName'],
              langName: lang['langLocalName'],
            });
          });
          this.localstorageservice.setItem('currentLang', this.currentLang);
          let params = [{ langShortName: this.currentLang }];
          this.subscriptions.push(
            this.httpEndpointService
              .getBy('language-data', params, 'path')
              .subscribe((data: ApiResponse) => {
                this.ithmaarPortalService.log(
                  'static translation data : ',
                  data.payload[0]['jsonObj'],
                );
                this.localstorageservice.setItem(
                  'static_translation',
                  data.payload[0]['jsonObj'],
                );

                this.onChangeLanguage(this.currentLang);
              }),
          );
        }),
    );
    */
  }

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    //this.getStaticTranslation();
    this.userIsadmin = this.localstorageservice.getItem('userIsAdmin');
    this.receivedData = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.localstorageservice.getItem('currentLang') == 'AR') {
      this.translateBtnToggle = false;
    }

    if (this.sessionStorageService.getItem('access_token')) {
      this.transferDataService
        .getBehaviorSubjectLoggedUser()
        .subscribe((res: boolean) => {
          if (res === true) {
            this.lan = this.localstorageservice.getItem('currentLang');
            if (this.lan == 'AR') {
              this.userFullName = this.sessionStorageService.getItem(
                'user_foreign_full_name',
              );
            } else {
              this.userFullName =
                this.sessionStorageService.getItem('user_full_name');
            }
            this.imageSrc = this.sessionStorageService.getItem('user_image');
          }
        });
      this.userType = this.sessionStorageService.getItem('user_type');
      this.lan = this.localstorageservice.getItem('currentLang');
      if (this.lan == 'AR') {
        this.userFullName = this.sessionStorageService.getItem(
          'user_foreign_full_name',
        );
      } else {
        this.userFullName =
          this.sessionStorageService.getItem('user_full_name');
      }
      this.imageSrc = this.sessionStorageService.getItem('user_image');
      this.initSocketConnection();
      this.fillMenu();

      if (this.router.url.includes('my-requests/new')) {
        this.newRequest = true;
      }

      if (this.receivedData != null) {
        this.updateRequest = true;
      }

      this.transferDataService
        .getBehaviorSubjectShowNewRequestBtn()
        .subscribe((changes) => {
          if (changes == true) {
            this.newRequest = false;
            this.updateRequest = false;
          } else if (changes != true && changes != false) {
            this.updateRequest = true;
          }
        });
    } else {
      this.getStaticTranslationForEntryHeader();
    }

    //this.transferDataService.disableChangingLanguage.next(false)
    this.transferDataService
      .getBehaviourSubjectDisableChangingLanguage()
      .subscribe((res) => {
        if (res) {
          this.newReport = true;
          this.updateReport = true;
        } else {
          this.newReport = false;
          this.updateReport = false;
        }
      });

    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true) {
          this.pageLoad = false;
          this.inEntry = false;
          this.modules = null;
          this.transferDataService.languageCanged.next(false);
          this.staticTranslation =
            this.localstorageservice.getItem('static_translation');
          this.lan = this.localstorageservice.getItem('currentLang');
          if (this.sessionStorageService.getItem('user_logged') == 'true') {
            this.getNotifications();
            this.fillMenu();
            if (this.lan == 'AR') {
              this.userFullName = this.sessionStorageService.getItem(
                'user_foreign_full_name',
              );
            } else {
              this.userFullName =
                this.sessionStorageService.getItem('user_full_name');
            }
          } else {
            this.pageLoad = true;
            this.inEntry = true;
          }
        }
      });
  }

  getStaticTranslationForEntryHeader() {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.inEntry = true;
    this.pageLoad = true;
  }

  initSocketConnection() {
    const serverUrl = this.url + 'ithWebChat';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.getNotifications();

    this.stompClient.connect({}, (frame) => {
      console.warn('STOMP: Connection successful with notification listner');
      this.listenNotifications();
    });
  }

  listenNotifications() {
    console.warn('listenNotifications');
    //this.getNotifications();

    this.stompClient.subscribe(
      `/queue/private/notifications/${this.userId}`,
      (data) => {
        let result = JSON.parse(data.body);
        console.warn(data);
        console.warn(result);
      },
    );
  }

  getNotifications() {
    this.coreService
      .getAllNotifications(
        this.userId,
        this.roleKey,
        this.pageNumber,
        this.pageSize,
      )
      .subscribe((res: ApiResponse) => {
        if (res.success === true) {
          this.ithmaarPortalService.log('notification delay after');
          this.unReadCount = res.payload.unReadCount;
          this.notificationList = res.payload.notifications;
          this.showNotificationCounter = true;
          if (this.unReadCount == 0) this.showNotificationCounter = false;
        }
      });
  }

  setReadNotificationOnClickBell() {
    this.coreService
      .setReadNotifications(this.userId, this.roleKey)
      .subscribe((res: ApiResponse) => {});
  }

  resetNotification() {
    this.coreService
      .setReadNotifications(this.userId, this.roleKey)
      .subscribe((res: ApiResponse) => {
        if (res.success === true) {
          this.coreService
            .getAllNotifications(
              this.userId,
              this.roleKey,
              this.pageNumber,
              this.pageSize,
            )
            .subscribe((res: ApiResponse) => {
              if (res.success === true) {
                this.unReadCount = res.payload.unReadCount;
              }
            });
        }
      });
  }
  onChangeLanguage(lang: string) {
    this.ithmaarPortalService.log('inside changeing lang ', lang);
    this.localstorageservice.setItem('currentLang', lang);
    this.currentLang = lang;

    // this.transferDataService.languageCanged.next(true);

    this.ithmaarPortalService.log('current lang from header', this.currentLang);
    let params = [{ langShortName: this.currentLang }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('language-data', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.ithmaarPortalService.log(
            'static translation data from header: ',
            data.payload[0]['jsonObj'],
          );
          this.localstorageservice.setItem(
            'static_translation',
            data.payload[0]['jsonObj'],
          );
          this.transferDataService.languageCanged.next(true);
        }),
    );

    this.currentLang = lang;
    //this.translate.use(lang);
    const DIR = lang === 'AR' ? 'rtl' : 'ltr';
    const TXT_ALIGNMENT = lang === 'AR' ? 'right' : 'left';
    this.document.getElementById('app-body-id').style.direction = DIR;
    this.document.getElementById('app-body-id').style.textAlign = TXT_ALIGNMENT;
    const HTML = this.document.getElementsByTagName('html')[0] as HTMLElement;
    HTML.dir = DIR;
  }

  logOut() {
    let rolKey = this.sessionStorageService.getItem('role_key');
    this.subscriptions.push(
      this.authService.logOut().subscribe((res: ApiResponse) => {
        if (res.success) {
          this.currentLang = this.localstorageservice
            .getItem('currentLang')
            .toLowerCase();
          if (this.currentLang === 'en') this.currentLang = 'EN';
          else if (this.currentLang === 'ar') this.currentLang = 'AR';

          this.sessionStorageService.clear();
          this.localstorageservice.clear();
          this.localstorageservice.setItem('currentLang', this.currentLang);
          if (rolKey != null && rolKey == 2) {
            this.router.navigate(['/login/customer']);
            (<any>window).Intercom('shutdown'); // to hide chat icon after log out
          } else this.router.navigate(['/']);
        }
      }),
    );
  }

  returnNewRequestToDefault() {
    this.newRequest = false;
  }

  navigateToAllNotifications() {
    // this.notification.close();
    this.router.navigate(['/dashboard/notifications']);
    this.coreService
      .setReadNotifications(this.userId, this.roleKey)
      .subscribe((res: ApiResponse) => {
        if (res.success === true) {
          this.getNotifications();
        }
      });
  }
  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  closeMenu() {
    this.menuOpened = false;
    this.newRequest = false;
    this.transferDataService.refreshOfferData.next(null);
  }

  changeLang(lang) {
    this.ithmaarPortalService.log('language is :' + lang);
    this.localstorageservice.setItem('currentLang', lang);
    if (lang == 'EN') this.translateBtnToggle = true;
    else this.translateBtnToggle = false;
  }
  nullifyUserKeyFromCreate() {
    let params = [
      { wppCusKey: this.sessionStorageService.getItem('user_profile_Id') },
      { clntKey: this.sessionStorageService.getItem('clnt_key') },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('user-request/create-request-check', params, 'path')
        .subscribe((data: ApiResponse) => {
          if (data.success) {
            this.transferDataService.userKeyFromCreate = null;
            this.newRequest = true;
            this.transferDataService.refreshOfferData.next(null);
            this.sessionStorageService.removeItem('fcp_key');
            const dialogRef = this.dialog.open(FinancialProgComponent, {
              width: '1200px',
              height: '920px',
              panelClass: 'main-popup',
              data: {
                row: null,
                status: 'create',
              },
              direction:
                this.localstorageservice.getItem('currentLang') == 'AR'
                  ? 'rtl'
                  : 'ltr',
            });
            dialogRef.afterClosed().subscribe((result) => {
              if (!result) this.newRequest = false;
            });
          } else {
            this.toast.warning(
              this.staticTranslation['ExceedRequestNumber'],
              this.staticTranslation['warning'],
            );
          }
        }),
    );
  }

  iconBrandClick() {
    if (this.userType == 'CUS') {
      this.router.navigate(['/dashboard/statistics']);
    } else if (this.userType == 'BU') {
      if (this.userIsadmin == 'T') {
        this.router.navigate(['/dashboard/setup']);
      } else if (this.sessionStorageService.getItem('userIsCsOfficer') == 'T') {
        this.router.navigate(['/dashboard/all-customer-service-reports']);
      } else {
        this.router.navigate(['/dashboard/transactions/all-requests']);
      }
    } else {
      this.router.navigate(['/entry']);
    }
    this.newRequest = false;
  }

  fillMenu() {
    this.userId = Number(this.sessionStorageService.getItem('user_Id'));
    let params = [{ usrKey: this.userId }];
    this.httpEndpointService
      .getBy('menu/fetch', params, 'req')
      .subscribe((data: ApiResponse) => {
        this.modules = data.payload;
        this.pageLoad = true;
        this.transferDataService.languageCanged.next(false);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
