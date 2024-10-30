import { Subscription } from 'rxjs';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-view-customer-service-letter',
  templateUrl: './view-customer-service-letter.component.html',
  styleUrls: ['./view-customer-service-letter.component.scss'],
})
export class ViewCustomerServiceLetterComponent implements OnInit, OnDestroy {
  customerServiceLetterData;
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    let params = [{ id: this.receivedData.row.cslKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('customer-service-letters', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.customerServiceLetterData = data.payload;
        }),
    );
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupCustomerServiceLetters },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: staticData.genericPrcKey },
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
