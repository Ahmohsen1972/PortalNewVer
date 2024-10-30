import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-view-required-document',
  templateUrl: './view-required-document.component.html',
  styleUrls: ['./view-required-document.component.scss'],
})
export class ViewRequiredDocumentComponent implements OnInit {
  pageLoad;
  requiredDocument;
  visible;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.requiredDocument = this.data.row;
    this.visible = this.data.row.visible;
    this.pageLoad = true;
  }
}
