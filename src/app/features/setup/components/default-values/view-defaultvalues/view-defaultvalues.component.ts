import { Subscription } from 'rxjs';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { AddNewDefaultValueComponent } from '../add-new-default-value/add-new-default-value.component';

@Component({
  selector: 'app-view-defaultvalues',
  templateUrl: './view-defaultvalues.component.html',
  styleUrls: ['./view-defaultvalues.component.scss'],
})
export class ViewDefaultvaluesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  defauleValuesData: any;
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
    this.getDefaultValues();
  }

  getDefaultValues() {
    let params = [{ id: this.receivedData.row.rovsKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('default-values-setup', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.defauleValuesData = data.payload;
          this.pageLoad = true;
        }),
    );
  }

  addDefaultValue(): void {
    const dialogRef = this.dialog.open(AddNewDefaultValueComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: this.receivedData.row,
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
