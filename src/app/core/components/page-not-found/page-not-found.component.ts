import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  userLogged: boolean;
  user_Id;
  constructor(private session: SessionStorageService) {}

  ngOnInit(): void {
    this.user_Id = this.session.getItem('user_Id');
    if (this.user_Id != null && this.user_Id != undefined && this.user_Id != '')
      this.userLogged = true;
  }
}
