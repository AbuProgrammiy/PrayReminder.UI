import { Component } from '@angular/core';
import { openDB } from 'idb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'template';

  constructor() {
    this.saveData()
    this.loadData()
  }

  storedData: string | null = null;

  async saveData() {
    const db = await openDB('myDatabase', 1, {
      upgrade(db) {
        db.createObjectStore('store');
      }
    });
    await db.put('store', 'John Doe', 'user_name');
    alert('Data saved!');
  }

  async loadData() {
    const db = await openDB('myDatabase', 1);
    this.storedData = await db.get('store', 'user_name');
    alert(`Stored Value: ${this.storedData}`);
  }
}


declare global {
  interface Window {
    Telegram: any;
  }
}