import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
@Component({
  selector: 'app-view-finance-module',
  templateUrl: './view-finance-module.component.html',
  styleUrls: ['./view-finance-module.component.scss'],
})
export class ViewFinanceModuleComponent implements OnInit {
  pageLoad;
  module;
  visible;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpEndPoint: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
  ) {}

  ngOnInit(): void {
    this.module = this.data.row;
    this.ithmaarPortalService.log('this.modules', this.module);
    this.visible = this.data.row.visible;
    this.pageLoad = true;
  }
}
