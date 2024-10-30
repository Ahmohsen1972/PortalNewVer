import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PeriodicElement } from '../classes/periodic';
import { HttpEndpointService } from './http-endpoint.service';
@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private httpEndpointService: HttpEndpointService) {}

  list: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  ];
  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);

  update(index: number, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value,
        };
      }
      return e;
    });
    this.list$.next(this.list);
  }

  getAllNotifications(
    userId: number,
    roleKey: number,
    pageNumber: number,
    pageSize: number,
  ) {
    return this.httpEndpointService.getAll(
      `notifications/users/${userId}/${roleKey}/${pageNumber}/${pageSize}`,
    );
  }
  setReadNotifications(userId: number, roleKey: number) {
    return this.httpEndpointService.update(
      `notifications/users/${userId}/${roleKey}`,
      '',
    );
  }
}
