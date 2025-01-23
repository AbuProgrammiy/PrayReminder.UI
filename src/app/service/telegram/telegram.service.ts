import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private telegram = (window as any).Telegram?.WebApp;

  constructor() { }

  get isTelegramWebAppAvailable(): boolean {
    return !!this.telegram;
  }

  get user(): any {
    return this.telegram?.initDataUnsafe?.user;
  }
}
