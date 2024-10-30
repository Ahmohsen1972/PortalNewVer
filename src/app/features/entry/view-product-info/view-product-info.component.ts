import { Subscription } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FinanceProduct } from 'app/core/interfaces/financeProduct';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-view-product-info',
  templateUrl: './view-product-info.component.html',
  styleUrls: ['./view-product-info.component.scss'],
})
export class ViewProductInfoComponent implements OnInit, OnDestroy {
  productData: FinanceProduct;
  subscription: Subscription[] = [];
  pageLoad: boolean = false;
  staticTranslation: string[];

  constructor(
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
    private matDialogRef: MatDialogRef<ViewProductInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.getproductData();
  }

  getproductData() {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
    let productKey = this.data.key;
    this.subscription.push(
      this.httpEndpointService
        .getAll(`finance-products-data/${productKey}`)
        .subscribe((data) => {
          this.productData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
