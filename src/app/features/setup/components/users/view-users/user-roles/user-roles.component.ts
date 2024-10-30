import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { AddEditUserRolesComponent } from './add-edit-user-roles/add-edit-user-roles.component';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss'],
})
export class UserRolesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  @Input() status: string;
  @Input() row: any;
  addEditComponent = AddEditUserRolesComponent;

  apiUrl = 'user-roles';
  rowKey = 'rlusKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'user-roles';
  params: any;
  columns = [];

  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private ithmaarPortalService: IthmaarPortalService,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getUserRolesData();
    this.getCustomProperties();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'rolLocalName', label: 'Role', hideOrder: 0, width: 80 },
      { id: 'action', label: 'Action', hideOrder: 4, width: 80 },
    ];
    this.pageLoad = true;
  }

  getUserRolesData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`user-roles/all/${this.row.usrKey}`)
        .subscribe((result: ApiResponse) => {
          this.transaction = `user-roles/all/${this.row.usrKey}`;
          this.ithmaarPortalService.log('el user roles data ', result.payload);
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;
            this.ithmaarPortalService.log('here is data', result);
          }
        }),
    );
  }

  refresh() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll(`user-roles/all/${this.row.usrKey}`)
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            this.ithmaarPortalService.log(
              'el user roles data ',
              result.payload,
            );
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

  addRole() {
    const dialogRef = this.dialog.open(this.addEditComponent, {
      width: '500px',
      panelClass: 'main-popup',
      data: {
        row: null,
        status: 'create',
        usrKey: this.row.usrKey,
      },
      direction:
        this.localStorageService.getItem('currentLang') == 'AR' ? 'rtl' : 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ithmaarPortalService.log('The dialog was closed result', result);
      if (result.action === 'confirm') {
        this.refresh();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
