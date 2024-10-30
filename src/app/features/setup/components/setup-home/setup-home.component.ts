import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-setup-home',
  templateUrl: './setup-home.component.html',
  styleUrls: ['./setup-home.component.scss'],
})
export class SetupHomeComponent implements OnInit {
  filterForm;
  moduleTypeV;
  userTypeV;
  modules = [
    {
      optText: 'All Requestes',
      optKey: 'R',
    },
    {
      optText: 'Other Modules',
      optKey: 'O',
    },
  ];
  users = [
    {
      optText: 'Customer User',
      optKey: 2,
    },
    {
      optText: 'Business User',
      optKey: 0,
    },
  ];

  constructor(
    private sessionStorageService: SessionStorageService,
    private fb: FormBuilder,
    private transferDataService: TransferDataService,
  ) {}

  ngOnInit(): void {}

  onBURSetup() {
    this.sessionStorageService.setItem('moduleType', 'R');
    this.sessionStorageService.setItem('userType', 0);
  }

  onBUOMSetup() {
    this.sessionStorageService.setItem('moduleType', 'O');
    this.sessionStorageService.setItem('userType', 0);
  }

  onCRSetup() {
    this.sessionStorageService.setItem('moduleType', 'R');
    this.sessionStorageService.setItem('userType', 2);
  }

  onCOMSetup() {
    this.sessionStorageService.setItem('moduleType', 'O');
    this.sessionStorageService.setItem('userType', 2);
  }

  onFlexSetup() {
    this.sessionStorageService.setItem('maIsFlexSetup', 'T');
    this.sessionStorageService.setItem('maIsAssetSetup', 'F');
  }

  onAssetSetup() {
    this.sessionStorageService.setItem('maIsAssetSetup', 'T');
    this.sessionStorageService.setItem('maIsFlexSetup', 'F');
  }
}
