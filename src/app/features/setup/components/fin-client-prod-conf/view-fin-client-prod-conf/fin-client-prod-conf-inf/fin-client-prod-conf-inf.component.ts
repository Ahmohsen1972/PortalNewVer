import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-fin-client-prod-conf-inf',
  templateUrl: './fin-client-prod-conf-inf.component.html',
  styleUrls: ['./fin-client-prod-conf-inf.component.scss'],
})
export class FinClientProdConfInfComponent implements OnInit {
  pageLoad;
  financeProduct;
  visible;

  @Input() status: string;
  @Input() row: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.financeProduct = this.data.row;
    this.visible = this.data.row.visible;
    this.pageLoad = true;
  }
}
