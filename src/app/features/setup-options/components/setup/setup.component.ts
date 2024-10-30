import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  banksLength: number;
  countriesLength: number;
  currenciesLength: number;
  requiredDocsLength: number;
  employersLength: number;
  assetClassesLength: number;
  customerServiceLettersLength: number;
  requestTermsConditionsUpdatedDate;
  termsConditionsUpdatedDate;
  modules: any[];
  userId: number;
  staticTranslation;

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private transferDataService: TransferDataService,
    private localstorageservice: LocalStorageService,
    public ithmaarPortalService: IthmaarPortalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.transferDataService.fetchScr = false;
    this.transferDataService.bpType = null; // nullify bpType for crud operations conditions in shared table
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.transferDataService.languageCanged.subscribe((res) => {
      if (res == true) {
        this.staticTranslation =
          this.localstorageservice.getItem('static_translation');
      }
    });

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('bank/all')
        .subscribe((result: ApiResponse) => {
          this.banksLength = result.payload.length;
        }),
    );

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('country/all')
        .subscribe((result: ApiResponse) => {
          this.countriesLength = result.payload.length;
        }),
    );

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('currency/all')
        .subscribe((result: ApiResponse) => {
          this.currenciesLength = result.payload.length;
        }),
    );

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('employer/all')
        .subscribe((result: ApiResponse) => {
          this.employersLength = result.payload.length;
        }),
    );

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('required-doc/all')
        .subscribe((result: ApiResponse) => {
          this.requiredDocsLength = result.payload.length;
        }),
    );
    let G_Param = [{ wtcType: 'G' }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('term-condition/filter', G_Param, 'path')
        .subscribe((result: ApiResponse) => {
          this.termsConditionsUpdatedDate = result.payload.updateDate;
        }),
    );
    let R_Params = [{ wtcType: 'R' }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('term-condition/filter', R_Params, 'path')
        .subscribe((result: ApiResponse) => {
          this.requestTermsConditionsUpdatedDate = result.payload.updateDate;
        }),
    );

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('asset-classes/all')
        .subscribe((result: ApiResponse) => {
          this.assetClassesLength = result.payload.length;
        }),
    );

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('customer-service-letters/all')
        .subscribe((result: ApiResponse) => {
          this.customerServiceLettersLength = result.payload.length;
        }),
    );

    this.fillMenu();

    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.router.url.includes('setup')) {
          this.fillMenu();
        }
      });
  }

  openTerms(title: string, menuId: number): void {
    const dialogRef = this.dialog.open(TermsConditionsComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        title: title,
        menuId: menuId,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (menuId == 7)
        this.requestTermsConditionsUpdatedDate = result.updateDate;
      else this.termsConditionsUpdatedDate = result.updateDate;
    });
  }

  fillMenu() {
    this.userId = Number(this.sessionStorageService.getItem('user_Id'));
    let params = [{ usrKey: this.userId, parentMenuId: 26 }];

    this.httpEndpointService
      .getBy('menu/fetch', params, 'req')
      .subscribe((data: ApiResponse) => {
        this.modules = data.payload;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
