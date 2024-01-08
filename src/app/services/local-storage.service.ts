import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import * as CordovaSQLiteDriver  from 'localforage-cordovasqlitedriver';
import { Drivers } from '@ionic/storage';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _storage: Storage | null = null;
  private is_initialized = false;

  constructor(private storage: Storage) {
  }

  async init() {
    if(this._storage != null) {
      return;
    }
    // await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this.is_initialized = true;
    this._storage = storage;
    console.log("storage initialized");
  }

  public async set(key: string, value: any): Promise<any> {
    if (!this.is_initialized) {
      await this.init();
    }
    return await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    if (!this.is_initialized) {
      await this.init();
    }
    return await this._storage?.get(key);
  }
 
}
