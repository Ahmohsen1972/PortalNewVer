import { Subscription } from 'rxjs';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { AddNewEmployerComponent } from '../add-new-employer/add-new-employer.component';

@Component({
  selector: 'app-view-employer',
  templateUrl: './view-employer.component.html',
  styleUrls: ['./view-employer.component.scss'],
})
export class ViewEmployerComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  staticTranslation: any;
  constructor(
    private httpEndpointService: HttpEndpointService,
    public dialog: MatDialog,
    private sessionStorageService: SessionStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private localstorageservice: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  employerData: any;
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    let params = [{ id: this.receivedData.row.weKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('employer', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.employerData = data.payload;
        }),
    );

    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupEmployer },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.ithmaarPortalService.log(
            'property data in view employer : ',
            data.payload,
          );
          this.probertyData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  addEmployer(): void {
    const dialogRef = this.dialog.open(AddNewEmployerComponent, {
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
