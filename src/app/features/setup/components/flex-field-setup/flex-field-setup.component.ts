import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { EditFlexFieldSetupComponent } from './edit-flex-field-setup/edit-flex-field-setup.component';

@Component({
  selector: 'app-flex-field-setup',
  templateUrl: './flex-field-setup.component.html',
  styleUrls: ['./flex-field-setup.component.scss'],
})
export class FlexFieldSetupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public dataSource = new MatTableDataSource();
  addEditComponent = EditFlexFieldSetupComponent;
  apiUrl = 'flex-field-setup';
  rowKey = 'maKey';
  probertyData: any;
  pageLoad: boolean = false;
  transaction = 'flex-field-setup';
  columns = [];
  title: string;

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
    private sessionStorageService: SessionStorageService,
  ) {}

  ngOnInit(): void {
    this.getCustomProperties();
    this.flexFieldSetupData();
  }

  getCustomProperties() {
    this.columns = [
      { id: 'modLocalName', label: 'Module Caption', hideOrder: 4 },
      { id: 'maLocalName', label: 'Attribute Name', hideOrder: 4 },
      { id: 'maSourceType', label: 'Control Type', hideOrder: 4 },
      { id: 'maDataType', label: 'Data Type', hideOrder: 4 },
      { id: 'maEnabled', label: 'Enable', hideOrder: 4 },
      { id: 'maVisible', label: 'Visible', hideOrder: 4 },
      { id: 'maRequired', label: 'Required', hideOrder: 4 },
      { id: 'action', label: 'Action', hideOrder: 0, width: 80 },
    ];
  }

  flexFieldSetupData() {
    let url;
    if (
      this.sessionStorageService.getItem('maIsFlexSetup') == 'T' &&
      this.sessionStorageService.getItem('maIsAssetSetup') == 'F'
    ) {
      url = `flex-field-setup/all-flex/${'T'}`;
      this.transaction = `flex-field-setup/all-flex/${'T'}`;
      this.title = 'Flex Fields';
    }
    if (
      this.sessionStorageService.getItem('maIsFlexSetup') == 'F' &&
      this.sessionStorageService.getItem('maIsAssetSetup') == 'T'
    ) {
      url = `flex-field-setup/all-asset/${'T'}`;
      this.transaction = `flex-field-setup/all-asset/${'T'}`;
      this.title = 'Asset Attributes';
    }
    this.subscriptions.push(
      this.httpEndpointService.getAll(url).subscribe((result: ApiResponse) => {
        if (result.payload.length > 0) {
          const rows = [];
          result.payload.forEach((element: any, index: number) => {
            element['id'] = index + 1;
            rows.push(element);
          });
          this.dataSource.data = rows;

          this.pageLoad = true;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
