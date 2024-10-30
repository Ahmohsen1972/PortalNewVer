import { Injectable } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { FlexBase } from './flex-base';
import { DropdownFlex } from './flex-dropdown';
import { TextboxFlex } from './flex-textbox';
import { HttpEndpointService } from '../http-endpoint.service';
import { ApiResponse } from '../../interfaces/api-response';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';

@Injectable()
export class FlexService implements OnDestroy {
  userRequest;
  addedItems;
  requestKey;
  private subscriptions: Subscription[] = [];
  constructor(
    private httpEndpointService: HttpEndpointService,
    private activatedRoute: ActivatedRoute,
  ) {}

  // TODO: get from a remote source of question metadata
  getFlexFields() {
    const flexfields: FlexBase<string>[] = [];

    this.subscriptions.push(
      this.httpEndpointService
        .getAll(
          'user-request/' + this.activatedRoute.snapshot.paramMap.get('id'),
        )
        .subscribe((data: ApiResponse) => {
          this.userRequest = data.payload;
        }),
    );
    this.requestKey = this.activatedRoute.snapshot.paramMap.get('id');

    this.subscriptions.push(
      this.httpEndpointService
        .getAll('custom-attribute/all/' + this.requestKey)
        .subscribe((data: ApiResponse) => {
          this.addedItems = data.payload;

          for (let i = 0; i < this.addedItems.length; i++) {
            if (this.addedItems[i].icaControlType == 'textbox') {
              flexfields.push(
                new TextboxFlex({
                  key: this.addedItems[i].icaKey,
                  fieldName: this.addedItems[i].fieldName,
                  label: this.addedItems[i].icaLabel,
                  value: this.addedItems[i].icaValue,
                  required: this.addedItems[i].icaRequired,
                  fieldType: this.addedItems[i].icaFieldType,
                  order: this.addedItems[i].icaOrder,
                }),
              );
            } else if (this.addedItems[i].icaControlType == 'dropdown') {
              flexfields.push(
                new DropdownFlex({
                  key: this.addedItems[i].icaKey,
                  fieldName: this.addedItems[i].fieldName,
                  label: this.addedItems[i].icaLabel,
                  value: this.addedItems[i].icaValue,
                  required: this.addedItems[i].icaRequired,
                  fieldType: this.addedItems[i].icaFieldType,
                  options: this.addedItems[i].options,
                  order: this.addedItems[i].icaOrder,
                }),
              );
            }
          }
        }),
    );

    return of(flexfields.sort((a, b) => a.order - b.order));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
