import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  async saveData(key:string, value:string) {
    const db = await openDB('myDatabase', 1, {
      upgrade(db) {
        db.createObjectStore('store');
      }
    });
    await db.put('store', value, key);
  }

  async loadData(key:string) {
    const db = await openDB('myDatabase', 1);
    return await db.get('store', key);
  }
}
