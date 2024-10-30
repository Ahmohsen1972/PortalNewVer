import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-module-information',
  templateUrl: './module-information.component.html',
  styleUrls: ['./module-information.component.scss'],
})
export class ModuleInformationComponent implements OnInit, OnDestroy {
  modules: any;
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
    this.getModule();
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

  getModule() {
    this.subscriptionList.push(
      this.httpEndpointService
        .getAll(`mod-setup/${this.row.masKey}`)
        .subscribe((res: ApiResponse) => {
          this.modules = res.payload;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
