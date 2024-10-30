import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-view-static-translation',
  templateUrl: './view-static-translation.component.html',
  styleUrls: ['./view-static-translation.component.scss'],
})
export class ViewStaticTranslationComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  staticData: any;
  params: any;
  probertyData: any;
  pageLoad: boolean = false;

  constructor(
    private httpEndpointService: HttpEndpointService,
    public dialog: MatDialog,
    private ithmaarPortalService: IthmaarPortalService,
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
  ) {}

  ngOnInit(): void {
    this.getLanguage();
  }

  getLanguage() {
    this.ithmaarPortalService.log('this.receivedData', this.receivedData);
    let params = [{ id: this.receivedData.row.lgdKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('static-translation', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.staticData = data.payload;
          this.pageLoad = true;
        }),
    );
  }
}
