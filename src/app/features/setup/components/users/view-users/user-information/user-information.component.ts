import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { HttpEndpointService } from 'app/core/services/http-endpoint.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent implements OnInit {
  userData: any;
  pageLoad: boolean = false;
  @Input() status: string;
  @Input() row: any;

  constructor(
    public dialog: MatDialog,
    private httpEndpointService: HttpEndpointService,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userData = this.row;
    this.pageLoad = true;
  }
}
