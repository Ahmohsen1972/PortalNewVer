import { Subscription } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ManageImgService } from 'app/core/services/manage-img.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  introImg: string;
  currentLang = 'EN';
  selectedLang: string;
  pageLoad: boolean = false;
  staticTranslation: string[];
  private allLangs: string[] = [];
  translateBtnToggle: boolean = true;
  private subscriptions: Subscription[] = [];
  private langDirection: { [k: string]: any } = {};

  constructor(
    private manageImgService: ManageImgService,
    private httpEndpointService: HttpEndpointService,
    private transferDataService: TransferDataService,
    private localstorageservice: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private sessionStorageService: SessionStorageService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.getCurrentLang();
    this.getImgByType('banner');
  }
  getImgByType(adsType: string) {
    
    this.subscriptions.push(
      this.manageImgService.getImgType(adsType).subscribe((res: any) => {
        this.introImg = 'data:image/jpeg;base64,' + res[0]?.media;
      }),
    );
    
  }

  getCurrentLang() {
    if (this.localstorageservice.getItem('currentLang') == null) {
      this.subscriptions.push(
        this.httpEndpointService
          .getAll('languages/all')
          .subscribe((data: ApiResponse) => {
            data.payload.forEach((lang) => {
              if (lang['langIsDefault'] === 'T') {
                this.currentLang = lang['langsShortName'];
              }
            });
          }),
      );
    } else {
      this.currentLang = this.localstorageservice.getItem('currentLang');
    }
    this.currentLang ="EN";
    this.getLangAndDirection();
  }

  getLangAndDirection() {
    console.log( "in get Lang Direction");
    this.localstorageservice.setItem('currentLang', this.currentLang);
    let params = [{ langShortName: this.currentLang }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('language-data', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.localstorageservice.setItem(
            'static_translation',
            data.payload[0]['jsonObj'],
          );
          this.staticTranslation = data.payload[0]['jsonObj'];
          console.log( " Data from Backend ", data);
          
          this.pageLoad = true;
          this.sessionStorageService.setItem('all_Languges', this.allLangs);
          this.sessionStorageService.setItem(
            'lang_Direction',
            this.langDirection,
          );
          this.currentLang = this.currentLang;
          const DIR = this.currentLang === 'AR' ? 'rtl' : 'ltr';
          const TXT_ALIGNMENT = this.currentLang === 'AR' ? 'right' : 'left';
          this.document.getElementById('app-body-id').style.direction = DIR;
          this.document.getElementById('app-body-id').style.textAlign =
            TXT_ALIGNMENT;
          const HTML = this.document.getElementsByTagName(
            'html',
          )[0] as HTMLElement;
          HTML.dir = DIR;
        }),
    );
    
  }

  onChangeLanguage(lang: string) {
    this.localstorageservice.setItem('currentLang', lang);
    this.currentLang = lang;
    this.transferDataService.languageCanged.next(true);
    let params = [{ langShortName: this.currentLang }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('language-data', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.localstorageservice.setItem(
            'static_translation',
            data.payload[0]['jsonObj'],
          );
          this.staticTranslation = data.payload[0]['jsonObj'];
          this.transferDataService.languageCanged.next(true);
        }),
    );

    this.currentLang = lang;
    const DIR = lang === 'AR' ? 'rtl' : 'ltr';
    const TXT_ALIGNMENT = lang === 'AR' ? 'right' : 'left';
    this.document.getElementById('app-body-id').style.direction = DIR;
    this.document.getElementById('app-body-id').style.textAlign = TXT_ALIGNMENT;
    const HTML = this.document.getElementsByTagName('html')[0] as HTMLElement;
    HTML.dir = DIR;
  }

  changeLang(lang) {
    this.ithmaarPortalService.log('language is :' + lang);
    this.localstorageservice.setItem('currentLang', lang);
    if (lang == 'EN') this.translateBtnToggle = true;
    else this.translateBtnToggle = false;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
