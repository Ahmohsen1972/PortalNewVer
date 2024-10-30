import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-domain-information',
  templateUrl: './domain-information.component.html',
  styleUrls: ['./domain-information.component.scss'],
})
export class DomainInformationComponent implements OnInit {
  domains: any;

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
    this.getUserProfile();
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

  getUserProfile() {
    this.subscriptionList.push(
      this.httpEndpointService
        .getAll(`domains/${this.row.rvKey}`)
        .subscribe((res: ApiResponse) => {
          this.domains = res.payload;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
