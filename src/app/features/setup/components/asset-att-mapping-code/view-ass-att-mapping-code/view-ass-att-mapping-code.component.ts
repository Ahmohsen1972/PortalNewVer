import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-view-ass-att-mapping-code',
  templateUrl: './view-ass-att-mapping-code.component.html',
  styleUrls: ['./view-ass-att-mapping-code.component.scss'],
})
export class ViewAssAttMappingCodeComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  assetClassAttributes: any;
  params: any;
  probertyData: any;
  pageLoad: boolean = false;

  constructor(
    private httpEndpointService: HttpEndpointService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    this.getAssetClassAttributesMappingCode();
  }

  getAssetClassAttributesMappingCode() {
    let params = [{ id: this.receivedData.row.rowkey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('ass-att-mapp', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.assetClassAttributes = data.payload;
          this.pageLoad = true;
        }),
    );
  }
}
