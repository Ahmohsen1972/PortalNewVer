import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public storage = sessionStorage;

  constructor() {}
  setItem(key: string, value: any) {
    if (typeof value == 'object') {
      this.storage.setItem(key, JSON.stringify(value));
    } else {
      this.storage.setItem(key, value);
    }
  }
  getItem(key: string): any {
    return this.storage.getItem(key);
  }
  removeItem(key: string) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}
