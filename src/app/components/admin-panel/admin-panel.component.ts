import { Component } from '@angular/core';
import { QuoteService } from '../../service/quote/quote.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  constructor(private quoteService: QuoteService,private messageService:MessageService) {
    this.getAll()
  }

  quotes: any
  allQuotes: any
  pendingQuotes: any
  acceptedQuotes: any
  canceledQuotes: any

  isLoading: boolean = false

  changeProcess(process: string) {
    switch (process) {
      case "all":
        this.quotes = this.allQuotes
        break;

      case "pending":
        this.quotes = this.pendingQuotes
        break;

      case "accepted":
        this.quotes = this.acceptedQuotes
        break;

      case "canceled":
        this.quotes = this.canceledQuotes
        break;
    }

    this.quotes
  }

  getAll() {
    this.isLoading = true

    this.quoteService.getAll().subscribe({
      next: (response) => {
        console.log(response)
        this.allQuotes = response
        this.pendingQuotes = response.filter((q: any) => q.process == 0)
        this.acceptedQuotes = response.filter((q: any) => q.process == 1)
        this.canceledQuotes = response.filter((q: any) => q.process == 2)

        this.quotes = this.allQuotes

        this.isLoading = false
      },
      error: (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadur xato ketdi!' });

        this.isLoading = false
      }
    })
  }
}
