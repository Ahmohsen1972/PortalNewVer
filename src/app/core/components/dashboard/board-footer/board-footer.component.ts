import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';
import { LocalStorageService } from 'app/core/services/local-storage.service';
import { TransferDataService } from 'app/core/services/transfer-data.service';
import { SessionStorageService } from 'app/core/services/session-storage.service';

@Component({
  selector: 'app-board-footer',
  templateUrl: './board-footer.component.html',
  styleUrls: ['./board-footer.component.scss'],
})
export class BoardFooterComponent implements OnInit {
  staticTranslation: String[];
  modules: any[];
  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private sessionStorageService: SessionStorageService,
    private httpEndpointService: HttpEndpointService,
    private dataTransferServic: TransferDataService,
  ) {}

  ngOnInit(): void {
    this.getStaticLocalization();
    this.changingLanguage();
  }

  changingLanguage() {
    this.dataTransferServic.languageCanged.next(false);
    this.dataTransferServic.languageCanged.subscribe((data) => {
      if (data == true) {
        this.getStaticLocalization();
      }
    });
  }

  getStaticLocalization() {
    this.staticTranslation =
      this.localStorageService.getItem('static_translation');
  }

  openWebSite() {
    window.open('http://www.ithmaar-solutions.com');
  }
  openTerms(): void {
  }
}
