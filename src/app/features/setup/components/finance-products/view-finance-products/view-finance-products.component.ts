import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-finance-products',
  templateUrl: './view-finance-products.component.html',
  styleUrls: ['./view-finance-products.component.scss'],
})
export class ViewFinanceProductsComponent implements OnInit {
  @ViewChild('tabGroup', { static: true }) tabGroup;
  public tabIndex = 0;
  chosenStep = '';
  status: string;
  row: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewFinanceProductsComponent>,
  ) {}

  ngOnInit(): void {
    this.row = this.data.row;

    if (this.data.action === 'create') {
      this.status = 'create';
    } else if (this.data.action === 'view') {
      this.status = 'view';
    } else if (this.data.action === 'Edit') {
      this.status = 'Edit';
    }
  }
  onTabChanged(tabIndex): void {
    this.tabIndex = tabIndex;
  }
  gotoStep(): void {
    switch (this.chosenStep) {
      case '0':
        this.tabGroup.selectedIndex = 0;
        break;
      case '1':
        this.tabGroup.selectedIndex = 1;
        break;
    }
  }
}
