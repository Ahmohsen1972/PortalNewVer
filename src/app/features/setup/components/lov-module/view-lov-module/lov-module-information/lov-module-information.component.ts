import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-lov-module-information',
  templateUrl: './lov-module-information.component.html',
  styleUrls: ['./lov-module-information.component.scss'],
})
export class LovModuleInformationComponent implements OnInit {
  lovModule: any;
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
    this.getLovModule();
  }

  getLovModule() {
    this.subscriptionList.push(
      this.httpEndpointService
        .getAll(`lov-modules/${this.row.ilmKey}`)
        .subscribe((res: ApiResponse) => {
          this.lovModule = res.payload;
          this.pageLoad = true;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }
}
