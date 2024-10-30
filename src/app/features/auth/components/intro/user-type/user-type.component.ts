import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss'],
})
export class UserTypeComponent implements OnInit, OnDestroy {
  currentLang: string;
  staticTranslation: string[];
  private subscriptions: Subscription[] = [];

  constructor(
    private route: Router,
    private transferDataService: TransferDataService,
    private localstorageservice: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.staticTranslation =
      this.localstorageservice.getItem('static_translation');
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true) {
          this.staticTranslation =
            this.localstorageservice.getItem('static_translation');
        }
      });
  }

  goLogin() {
    this.route.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
