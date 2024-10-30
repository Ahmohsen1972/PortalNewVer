import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { ViewLanguageComponent } from './view-language/view-language.component';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { AddNewLanguageComponent } from './add-new-language/add-new-language.component';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddNewLanguageComponent;
  viewComponent = ViewLanguageComponent;
  apiUrl = 'languages-admin';
  rowKey = 'langKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'Languages-admin';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getLanguagesData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'langLocalName', label: 'Name', hideOrder: 0, width: 75 },
      { id: 'langIsDefault', label: 'Default', hideOrder: 1 },
      { id: 'langForeignName', label: 'Foreign Name', hideOrder: 4 },
      { id: 'langdisplayOrder', label: 'Order', hideOrder: 4 },
      { id: 'langDir', label: 'langDir', hideOrder: 4 },
      { id: 'langsShortName', label: 'Short Name', hideOrder: 4 },
      { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
    ];
    this.pageLoad = true;
  }

  getLanguagesData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('languages-admin/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
