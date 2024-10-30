import { Subscription } from 'rxjs';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { AddNewCurrencyComponent } from '../add-new-currency/add-new-currency.component';

@Component({
  selector: 'app-view-currency',
  templateUrl: './view-currency.component.html',
  styleUrls: ['./view-currency.component.scss'],
})
export class ViewCurrencyComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(
    private httpEndpointService: HttpEndpointService,
    public dialog: MatDialog,
    private sessionStorageService: SessionStorageService,
    private localstorageservice: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  currencyData: any;
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  staticTranslation: any;

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    let params = [{ id: this.receivedData.row.wcrKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('currency', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.currencyData = data.payload;
        }),
    );

    this.getCustomProperties();
  }
  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupCurrency },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  addCurrency(): void {
    const dialogRef = this.dialog.open(AddNewCurrencyComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.receivedData.row,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
