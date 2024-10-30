import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { FetchUserComponent } from './fetch-user/fetch-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  columns = [];
  viewComponent = ViewUsersComponent;
  rowKey = 'buKey';

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private localstorageservice: LocalStorageService,
    private transferDataService: TransferDataService,
  ) {}

  ngOnInit(): void {
    this.transferDataService.fetchScr = true;
    this.getUserData();
    this.columns = [
      { id: 'usrLoginName', label: 'Login Name', hideOrder: 0, width: 75 },
      { id: 'wppLFirstName', label: 'First Name', hideOrder: 1 },
      { id: 'wppLMiddleName', label: 'Middle Name', hideOrder: 1 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
  }
  getUserData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('fech-business-user/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];

            result.payload.forEach((element: any, index: number) => {
              element['Id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
          }
        }),
    );
  }
  fetchUser() {
    const dialogRef = this.dialog.open(FetchUserComponent, {
      width: '700px',
      panelClass: 'main-popup',
      direction:
        this.localstorageservice.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action == 'confirm') {
        this.getUserData();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
