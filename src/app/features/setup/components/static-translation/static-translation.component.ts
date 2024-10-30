import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { ViewStaticTranslationComponent } from './view-static-translation/view-static-translation.component';
import { AddNewStaticTranslationComponent } from './add-new-static-translation/add-new-static-translation.component';

@Component({
  selector: 'app-static-translation',
  templateUrl: './static-translation.component.html',
  styleUrls: ['./static-translation.component.scss'],
})
export class StaticTranslationComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddNewStaticTranslationComponent;
  viewComponent = ViewStaticTranslationComponent;
  apiUrl = 'static-translation';
  rowKey = 'lgdKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'static-translation';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private ithmaarPortalService: IthmaarPortalService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getLanguagesData();
    this.getCustomProperties();
  }
  getCustomProperties() {
    this.columns = [
      { id: 'langLocalName', label: 'Languange name', hideOrder: 0, width: 75 },
      { id: 'controlName', label: 'control name', hideOrder: 1 },
      { id: 'controlValue', label: 'descritption', hideOrder: 4 },
      { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
    ];
    this.pageLoad = true;
  }
  getLanguagesData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('static-translation/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log(
              'this.dataSource.data',
              this.dataSource.data,
            );
          }
        }),
    );
  }

  addLanguage() {
    const dialogRef = this.dialog.open(AddNewStaticTranslationComponent, {
      width: '750px',
      panelClass: 'main-popup',
      data: {
        row: null,
        status: 'create',
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refresh();
    });
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('static-translation/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            // this.ithmaarPortalService.log('data after refresh in employer : ',this.dataSource.data);
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
