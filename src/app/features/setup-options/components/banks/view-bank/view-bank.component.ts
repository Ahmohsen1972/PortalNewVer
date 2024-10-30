import { Subscription } from 'rxjs';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { staticData } from 'app/core/constants/StatisticData';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewBanksComponent } from '../add-new-banks/add-new-banks.component';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.scss'],
})
export class ViewBankComponent implements OnInit, OnDestroy {
  bankData;
  params: any;
  probertyData: string[];
  pageLoad: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private localstorageservice: LocalStorageService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    let params = [{ id: this.receivedData.row.wbKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('bank', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.bankData = data.payload;
        }),
    );
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupBank },
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

  addBank(): void {
    const dialogRef = this.dialog.open(AddNewBanksComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.receivedData.row,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
