import { Subscription } from 'rxjs';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { staticData } from 'app/core/constants/StatisticData';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { AddNewCountryComponent } from '../add-new-country/add-new-country.component';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.scss'],
})
export class ViewCountryComponent implements OnInit, OnDestroy {
  countryData;
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private localstorageservice: LocalStorageService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    let params = [{ id: this.receivedData.row.wcKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('country', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.countryData = data.payload;
        }),
    );

    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupCountry },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.ithmaarPortalService.log(
            'property data in view country : ',
            data.payload,
          );
          this.probertyData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  addCountry(): void {
    const dialogRef = this.dialog.open(AddNewCountryComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.receivedData.row,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.ithmaarPortalService.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
