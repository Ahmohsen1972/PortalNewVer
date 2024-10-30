import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-product-information',
  templateUrl: './finance-product-information.component.html',
  styleUrls: ['./finance-product-information.component.scss'],
})
export class FinanceProductInformationComponent implements OnInit {
  financeProduct: any;

  subscriptionList: Subscription[] = [];

  params: any;
  probertyData: any;
  pageLoad: boolean = false;

  @Input() status: string;
  @Input() row: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFinanceProduct();
  }

  getFinanceProduct() {
    this.financeProduct = this.row;
    this.pageLoad = true;
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
