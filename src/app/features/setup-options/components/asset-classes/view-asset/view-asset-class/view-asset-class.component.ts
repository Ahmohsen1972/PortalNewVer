import { Router } from '@angular/router';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';

@Component({
  selector: 'app-view-asset-class',
  templateUrl: './view-asset-class.component.html',
  styleUrls: ['./view-asset-class.component.scss'],
})
export class ViewAssetClassComponent implements OnInit {
  @ViewChild('tabGroup', { static: true }) tabGroup;
  public tabIndex = 0;
  chosenStep = '';
  status: string;
  row: any;
  pageLoad: boolean = false;
  staticTranslation: string[];
  constructor(
    private localstorageservice: LocalStorageService,
    private transferDataService: TransferDataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<ViewAssetClassComponent>,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (
          changes == true &&
          this.router.url.includes('setup/asset-classes')
        ) {
          this.pageLoad = false;

          this.staticTranslation =
            this.localstorageservice.getItem('static_translation');
        }
      });

    this.row = this.data.row;

    if (this.data.action === 'create') {
      this.status = 'create';
    } else if (this.data.action === 'view') {
      this.status = 'view';
    } else if (this.data.action === 'Edit') {
      this.status = 'Edit';
    }
    this.pageLoad = true;
  }
  onTabChanged(tabIndex): void {
    this.tabIndex = tabIndex;
  }
  gotoStep(): void {
    switch (this.chosenStep) {
      case '0':
        this.tabGroup.selectedIndex = 0;
        break;
      case '1':
        this.tabGroup.selectedIndex = 1;
        break;
    }
  }
}
