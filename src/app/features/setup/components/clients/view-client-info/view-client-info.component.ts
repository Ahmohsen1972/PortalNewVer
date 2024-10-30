import { Subscription } from 'rxjs';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-view-client-info',
  templateUrl: './view-client-info.component.html',
  styleUrls: ['./view-client-info.component.scss'],
})
export class ViewClientInfoComponent implements OnInit, OnDestroy {
  imageSrc: string = 'data:image/jpeg;base64,';
  private subscriptions: Subscription[] = [];
  clientData: any;
  params: any;
  probertyData: any;
  pageLoad: boolean = false;

  constructor(
    private httpEndpointService: HttpEndpointService,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    this.getClientData();
  }

  getClientData() {
    let params = [{ id: this.receivedData.row.clntKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('client', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.clientData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
