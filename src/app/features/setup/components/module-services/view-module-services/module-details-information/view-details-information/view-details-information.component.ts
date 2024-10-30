import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-view-details-information',
  templateUrl: './view-details-information.component.html',
  styleUrls: ['./view-details-information.component.scss'],
})
export class ViewDetailsInformationComponent implements OnInit {
  ModuleServices: any;
  visible;
  pageLoad: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.ModuleServices = this.data.row;
    this.visible = this.data.row.visible;
    this.pageLoad = true;
  }
}
