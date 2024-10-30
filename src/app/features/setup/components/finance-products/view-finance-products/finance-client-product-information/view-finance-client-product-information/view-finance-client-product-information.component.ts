import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-view-finance-client-product-information',
  templateUrl: './view-finance-client-product-information.component.html',
  styleUrls: ['./view-finance-client-product-information.component.scss'],
})
export class ViewFinanceClientProductInformationComponent implements OnInit {
  pageLoad;
  financeProduct;
  visible;
  fcpDownPaymentAllowed: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.financeProduct = this.data.row;
    this.visible = this.data.row.visible;
    this.fcpDownPaymentAllowed = this.data.row.fcpDownPaymentAllowed;

    this.pageLoad = true;
  }
}
