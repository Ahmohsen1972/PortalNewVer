import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'app/core/services/local-storage.service';

@Component({
  selector: 'app-confirm-pop',
  templateUrl: './confirm-pop.component.html',
  styleUrls: ['./confirm-pop.component.scss'],
})
export class ConfirmPopComponent implements OnInit {
  staticTranslation: String[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
    public dialogRef: MatDialogRef<ConfirmPopComponent>,

    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
  }

  delete() {}

  confirmDelete() {
    this.dialogRef.close({ action: 'confirm' });
  }
}
