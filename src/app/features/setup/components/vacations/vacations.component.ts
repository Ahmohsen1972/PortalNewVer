import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { AddEditVacationComponent } from './add-edit-vacation/add-edit-vacation.component';

@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.scss'],
})
export class VacationsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = AddEditVacationComponent;
  apiUrl = 'vacations';
  rowKey = 'vamKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'vacations';
  columns = [];

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getCustomProperties();
    this.vacationsData();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'vamCode', label: 'Code', hideOrder: 4 },
      { id: 'vamLocalName', label: 'Name', hideOrder: 4 },
      { id: 'vamFisicalYear', label: 'Fiscal Year', hideOrder: 4 },
      { id: 'vamForeignName', label: 'Foreign Name', hideOrder: 4 },
      { id: 'vamFromDate', label: 'From Date', hideOrder: 4 },
      { id: 'vamToDate', label: 'To Date', hideOrder: 4 },
      { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
    ];
  }

  vacationsData() {
    this.subscriptions.push(
      this.httpEndpointService
        .getAll('vacations/all')
        .subscribe((result: ApiResponse) => {
          if (result.payload.length > 0) {
            const rows = [];
            result.payload.forEach((element: any, index: number) => {
              element['vamFromDate'] = this.getDateAndControlName(
                element['vamFromDate'],
              );
              element['vamToDate'] = this.getDateAndControlName(
                element['vamToDate'],
              );
              element['id'] = index + 1;
              rows.push(element);
            });
            this.dataSource.data = rows;

            this.pageLoad = true;
          }
        }),
    );
  }

  addVacation() {
    const dialogRef = this.dialog.open(this.addEditComponent, {
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
      this.vacationsData();
    });
  }

  getDateAndControlName(value): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(value, 'yyyy-MM-dd');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
