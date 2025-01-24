import { MessageService } from 'primeng/api';
import { QuoteService } from './../../service/quote/quote.service';
import { Component } from '@angular/core';
import { TelegramService } from '../../service/telegram/telegram.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private quoteService: QuoteService, private messageService: MessageService, private telegramService:TelegramService) { }

  user:any
  something:any
  ngOnInit(): void {
    if (this.telegramService.isTelegramWebAppAvailable) {
      this.user = this.telegramService.user;
      this.something=this.user.id
      console.log(this.user)
    } else {
      this.something="not working"
      console.error('Telegram Web App is not available.');
    }
  }

  warnMsg: string = ""
  isLoading: boolean = false

  quoteBody: QuoteBody = {
    body: "",
    author: null
  }

  createQuote() {
    this.isLoading = true;

    this.quoteBody.body = this.quoteBody.body.trim();

    if (this.quoteBody.body == "") {
      this.warnMsg = "Iqtibos to'ldirilishi kerak";
      this.isLoading = false
      return
    }

    if (this.quoteBody.author != null) {
      this.quoteBody.author = this.quoteBody.author!.trim()
      if(this.quoteBody.author==""){
        this.quoteBody.author = null
      }
    }

    this.quoteService.create(this.quoteBody).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: 'Qo\'shildi' });
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xatolik!', detail: 'Nimadur xato ketdi!' });
        this.isLoading = false
      }
    })
  }
}

type QuoteBody = {
  body: string,
  author: string | null
};