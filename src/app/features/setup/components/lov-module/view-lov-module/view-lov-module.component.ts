import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-lov-module',
  templateUrl: './view-lov-module.component.html',
  styleUrls: ['./view-lov-module.component.scss'],
})
export class ViewLovModuleComponent implements OnInit {
  @ViewChild('tabGroup', { static: true }) tabGroup;
  public tabIndex = 0;
  chosenStep = '';
  status: string;
  row: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewLovModuleComponent>,
  ) {}

  ngOnInit(): void {
    this.row = this.data.row;

    if (this.data.action === 'create') {
      this.status = 'create';
    } else if (this.data.action === 'view') {
      this.status = 'view';
    } else if (this.data.action === 'Edit') {
      this.status = 'Edit';
    }
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
      case '2':
        this.tabGroup.selectedIndex = 2;
        break;
    }
  }
}
