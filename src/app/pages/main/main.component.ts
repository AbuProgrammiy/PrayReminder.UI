import { QuoteService } from './../../service/quote/quote.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private quoteService: QuoteService) { }

  warnMsg: string = ""
  isLoading: boolean = false

  quoteBody = {
    body: null,
    author: null
  }

  createQuote() {
    this.isLoading = true

    this.quoteService.create(this.quoteBody).subscribe({
      next: (response) => {
        this.isLoading = false
      },
      error: (err) => {
        this.warnMsg="Iqtibos to'ldirilishi kerak"
        this.isLoading = false
      }
    })
  }
}
