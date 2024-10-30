import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { MainInfoService } from 'app/features/user-profile/services/main-info.service';

@Component({
  selector: 'app-module-services-information',
  templateUrl: './module-services-information.component.html',
  styleUrls: ['./module-services-information.component.scss'],
})
export class ModuleServicesInformationComponent implements OnInit {
  ModuleServices: any;

  subscriptionList: Subscription[] = [];

  params: any;
  probertyData: any;
  pageLoad: boolean = false;

  @Input() status: string;
  @Input() row: any;

  constructor(
    public dialog: MatDialog,
    private mainInfoService: MainInfoService,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    //this.ithmaarPortalService.log("  res.this.row  ",this.row)

    this.getModuleServices();
    // this.getCustomProperties();
  }

  getCustomProperties() {
    this.params = [{ modKey: 97 }];
    this.subscriptionList.push(
      this.httpEndpointService
        .getBy('module-attribute', this.params, 'path')
        .subscribe((data: ApiResponse) => {
          this.probertyData = data.payload;
          this.ithmaarPortalService.log(
            'this.probertyData_____> ',
            this.probertyData,
          );
          this.pageLoad = true;
        }),
    );
  }

  getModuleServices() {
    this.pageLoad = true;

    this.subscriptionList.push(
      this.httpEndpointService
        .getAll(`ModuleService/${this.row.imsKey}`)
        .subscribe((res: ApiResponse) => {
          this.ModuleServices = res.payload;
          //this.ithmaarPortalService.log("  this.row.imsKey  mm <><>< ",this.row.imsKey)
          this.ithmaarPortalService.log('  res.payload  ', res.payload);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
