import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiResponse } from 'app/core/interfaces/api-response';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-view-language',
  templateUrl: './view-language.component.html',
  styleUrls: ['./view-language.component.scss'],
})
export class ViewLanguageComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  languageData: any;
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
    this.getLanguage();
  }

  getLanguage() {
    let params = [{ id: this.receivedData.row.langKey }];
    this.subscriptions.push(
      this.httpEndpointService
        .getBy('languages-admin', params, 'path')
        .subscribe((data: ApiResponse) => {
          this.languageData = data.payload;
          this.pageLoad = true;
        }),
    );
  }
}
