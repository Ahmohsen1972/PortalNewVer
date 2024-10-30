import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-csl-req-doc',
  templateUrl: './view-csl-req-doc.component.html',
  styleUrls: ['./view-csl-req-doc.component.scss'],
})
export class ViewCslReqDocComponent implements OnInit {
  pageLoad: boolean = false;
  requiredDocument;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.requiredDocument = this.data.row;
    this.pageLoad = true;
  }
}
