import { Subscription } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
@Component({
  selector: 'app-view-asset-att',
  templateUrl: './view-asset-att.component.html',
  styleUrls: ['./view-asset-att.component.scss'],
})
export class ViewAssetAttComponent implements OnInit {
  assetAtt: [];
  probertyData: string[];
  pageLoad: boolean = false;
  private subscriptions: Subscription[] = [];
  params: any;
  required: string;
  constructor(
    private sessionStorageService: SessionStorageService,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.assetAtt = this.data;
    this.required = this.data.row.acaRequired;
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [
      { modKey: 152 },
      { rolKey: this.sessionStorageService.getItem('role_key') },
      { prcKey: -1 },
    ];

    this.subscriptions.push(
      this.httpEndPoint
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;

          this.pageLoad = true;
        }),
    );
  }
}
