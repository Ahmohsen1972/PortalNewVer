import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-lovs-information',
  templateUrl: './lovs-information.component.html',
  styleUrls: ['./lovs-information.component.scss'],
})
export class LovsInformationComponent implements OnInit, OnDestroy {
  lovs: any;
  subscriptionList: Subscription[] = [];
  params: any;
  probertyData: any;
  pageLoad: boolean = false;
  @Input() status: string;
  @Input() row: any;

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getLov();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [{ modKey: 97 }];
    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  getLov() {
    this.subscriptionList.push(
      this.httpEndpointService
        .getAll(`lov-admin/${this.row.lovKey}`)
        .subscribe((res: ApiResponse) => {
          this.lovs = res.payload;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
