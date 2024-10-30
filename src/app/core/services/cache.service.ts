import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  /**
   * Set the storage engine
   */
  public storage = window.localStorage;
  constructor() {}

  /**
   * Set data into storage engine
   * @param {string} key
   * @param {value} value
   */
  set(key: string, value: any) {
    this.storage.setItem(
      key,
      JSON.stringify({
        data: value,
      }),
    );
  }

  /**
   * Get vale from storage engine
   *
   * @param   {string} key
   * @returns {any}
   */
  get(key: string) {
    let value = this.storage.getItem(key);

    return value ? JSON.parse(value).data : null;
  }
  has(key: string) {
    return this.get(key) !== null;
  }
  /**
   * Remove key from storage
   *
   * @param  {string} key
   */
  remove(key: string) {
    this.storage.removeItem(key);
  }

  /**
   * Remove key from storage
   *
   * @param  {string} key
   */
  clear(key: string) {
    this.storage.clear();
  }
}
