import { Component, EventEmitter, Output } from '@angular/core';
import { QuoteService } from '../../service/quote/quote.service';
import { MessageService } from 'primeng/api';
import { DatabaseService } from '../../service/database/database.service';

@Component({
  selector: 'add-quote',
  templateUrl: './add-quote.component.html',
  styleUrl: './add-quote.component.scss'
})
export class AddQuoteComponent {

  constructor(private quoteService: QuoteService, private messageService: MessageService, private database: DatabaseService) {
    this.initateQuoteBody()
  }

  warnMsg: string = ""
  isLoading: boolean = false

  quoteBody: QuoteBody= {
    userId: 0,
    body: "",
    author: null
  }

  initateQuoteBody() {
    this.database.loadData("user").then(value => {
      this.quoteBody = {
        userId: JSON.parse(value).id,
        body: "",
        author: null
      }
    })
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
      if (this.quoteBody.author == "") {
        this.quoteBody.author = null
      }
    }

    this.quoteService.create(this.quoteBody).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: 'Qo\'shildi' });
          this.quoteBody.body = ""
          this.quoteBody.author = null
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Diqqat!', detail: response.response });
        }
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
  userId: number,
  body: string,
  author: string | null
};