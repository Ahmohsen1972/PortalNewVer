import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-codes-information',
  templateUrl: './view-codes-information.component.html',
  styleUrls: ['./view-codes-information.component.scss'],
})
export class ViewCodesInformationComponent implements OnInit {
  codes: [];
  visible;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.codes = this.data;
    this.visible = this.data.row.visible;
  }
}
