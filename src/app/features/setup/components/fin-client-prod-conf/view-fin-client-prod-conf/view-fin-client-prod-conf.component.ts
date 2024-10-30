import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';

@Component({
  selector: 'app-view-fin-client-prod-conf',
  templateUrl: './view-fin-client-prod-conf.component.html',
  styleUrls: ['./view-fin-client-prod-conf.component.scss'],
})
export class ViewFinClientProdConfComponent implements OnInit {
  @ViewChild('tabGroup', { static: true }) tabGroup;
  public tabIndex = 0;
  chosenStep = '';
  status: string;
  row: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ithmaarPortalService: IthmaarPortalService,
    public dialogRef: MatDialogRef<ViewFinClientProdConfComponent>,
  ) {}

  ngOnInit(): void {
    this.ithmaarPortalService.log('this.data ', this.data);
    this.row = this.data.row;

    if (this.data.action === 'create') {
      this.status = 'create';
    } else if (this.data.action === 'view') {
      this.status = 'view';
    } else if (this.data.action === 'Edit') {
      this.status = 'Edit';
    }
    // this.ithmaarPortalService.log("mostafa&moslam",this.data)
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
