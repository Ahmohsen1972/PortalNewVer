import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent implements OnInit {
  @Input() msg = 'No data Found';
  @Input() showPage = false;
  @Input() showFolder = false;
  @Input() showHand = false;

  constructor() {}

  ngOnInit(): void {}
}
