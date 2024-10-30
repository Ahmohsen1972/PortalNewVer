import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-finance-parameters-module',
  templateUrl: './view-finance-parameters-module.component.html',
  styleUrls: ['./view-finance-parameters-module.component.scss'],
})
export class ViewFinanceParametersModuleComponent implements OnInit {
  pageLoad;
  parameters;
  visible;
  required;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.parameters = this.data.row;
    this.visible = this.data.row.fcppIsVisible;
    this.required = this.data.row.fcppIsRequired;
    this.pageLoad = true;
  }
}
