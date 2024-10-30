import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IthmaarPortalEntity } from 'app/core/interfaces/IthmaarPortalEntity';
import { IthmaarPortalService } from 'app/core/services/ithmaar-portal.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';

@Component({
  selector: 'app-generic-popup',
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.scss'],
})
export class GenericPopupComponent implements OnInit {
  staticTranslation: String[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GenericPopupComponent>,
    private ithmaarPortalService: IthmaarPortalService,
    private dataTransferServic: TransferDataService,
    private localstorageservice: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getStaticTranslation();
    this.changingLanguage();
  }

  getStaticTranslation() {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
  }

  changingLanguage() {
    this.dataTransferServic.languageCanged.next(false);
    this.dataTransferServic.languageCanged.subscribe((data) => {
      if (data == true) {
        this.getStaticTranslation();
      }
    });
  }
  okAction() {
    this.dialogRef.close({ action: 'ok' });
  }

  getPaymentDateFormat(): string {
    return this.ithmaarPortalService.getDateFormat(this.data.date);
  }

  ngOnDestroy() {
    if (this.data.clearData) {
      this.sessionStorageService.clear();
      this.localstorageservice.clear();

      this.router.navigate(['/login/customer']);
      (<any>window).Intercom('shutdown');
    }
  }
}
