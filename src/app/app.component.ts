import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'template';

  storedData: string | null = "endi";

  constructor() {
    if (window.Telegram) {
      window.Telegram.WebApp.expand(); // Expands the Mini App
    }
  }

  // Save to Cloud Storage
  saveData() {
    window.Telegram.WebApp.CloudStorage.setItem('user_name', 'John Doe', (err: any) => {
      if (err) {
        console.error('Error saving data:', err);
      } else {
        alert('Data saved successfully!');
      }
    });
  }

  // Load from Cloud Storage
  loadData() {
    window.Telegram.WebApp.CloudStorage.getItem('user_name', (err: any, value: string) => {
      if (err) {
        console.error('Error retrieving data:', err);
      } else {
        this.storedData = value;
        alert(`Stored Value: ${this.storedData}`);
      }
    });
  }

}


declare global {
  interface Window {
    Telegram: any;
  }
}