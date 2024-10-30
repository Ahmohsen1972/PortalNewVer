import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { TransferDataService } from '../../services/transfer-data.service';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  APP_ID = 'gdbml595';
  chatIconPoition = 'right';
  date = new Date();
  userType: string;
  userName: string;
  userId: string;
  horizontalPadding = 20;
  verticalPadding = 50;
  currentLang: string;

  constructor(
    private session: SessionStorageService,
    private localstorageservice: LocalStorageService,
    private transferDataService: TransferDataService,
  ) {
    this.userType = this.session.getItem('user_type');
    this.userName = this.session.getItem('user_full_name');
    this.userId = this.session.getItem('user_Id');
    this.currentLang = this.localstorageservice
      .getItem('currentLang')
      .toLowerCase();
  }

  ngOnInit(): void {
    this.transferDataService.languageCanged.next(false);
    this.transferDataService
      .getBehaviorSubjectLanguageChanged()
      .subscribe((changes) => {
        if (changes == true && this.userType == 'CUS') {
          this.currentLang = this.localstorageservice
            .getItem('currentLang')
            .toLowerCase();
          (<any>window).Intercom('hide');
          this.initChat();
          (<any>window).Intercom('update');
          (<any>window).Intercom('show');
        }
      });
    if (this.userType == 'CUS') this.initChat();
  }
  initChat() {
    (<any>window).Intercom('boot', {
      app_id: this.APP_ID,
      email: this.userName,
      created_at: this.date.getTime(),
      name: this.userName,
      user_id: this.userId,
    });
    (<any>window).intercomSettings = {
      app_id: this.APP_ID,
      alignment: this.chatIconPoition,
      horizontal_padding: this.horizontalPadding,
      vertical_padding: this.verticalPadding,
      language_override: this.currentLang,
    };
  }
}
