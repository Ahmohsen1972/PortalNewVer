import { Subscription } from 'rxjs';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { AddNewRequiredDocComponent } from '../add-new-required-doc/add-new-required-doc.component';

@Component({
  selector: 'app-view-required-doc',
  templateUrl: './view-required-doc.component.html',
  styleUrls: ['./view-required-doc.component.scss'],
})
export class ViewRequiredDocComponent implements OnInit, OnDestroy {
  requiredDocData;
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private httpEndpointService: HttpEndpointService,
    public dialog: MatDialog,
    private sessionStorageService: SessionStorageService,
    private localstorageservice: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    let params = [{ id: this.receivedData.row.wrdKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('required-doc', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.requiredDocData = data.payload;
        }),
    );

    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupRequiredDocs },
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

  editReqDoc(): void {
    const dialogRef = this.dialog.open(AddNewRequiredDocComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.receivedData.row,
      },
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
