import { Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { staticData } from 'app/core/constants/StatisticData';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-asset-information',
  templateUrl: './asset-information.component.html',
  styleUrls: ['./asset-information.component.scss'],
})
export class AssetInformationComponent implements OnInit {
  assetClassData;
  params: any;
  probertyData: string[];
  pageLoad: boolean = false;
  @Input() status: string;
  @Input() row: any;
  private subscriptions: Subscription[] = [];
  constructor(
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    // let params = [{ id: this.receivedData.row.wacKey }];
    // this.subscriptions.push(this.httpEndpointService.getBy("asset-classes", params, "path").subscribe(
    //   (data: ApiResponse) => {
    //   this.assetClassData = data.payload;
    // }))
    this.assetClassData = this.row;
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: staticData.setupAssetClass },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: staticData.genericPrcKey },
    ];
    this.ithmaarPortalService.log('this.probertyData ', this.params);

    this.subscriptions.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;

          this.ithmaarPortalService.log(
            'this.probertyData ',
            this.probertyData,
          );
          this.pageLoad = true;
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
