import { Component } from '@angular/core';
import { QuoteService } from '../../service/quote/quote.service';
import { MessageService } from 'primeng/api';
import { DatabaseService } from '../../service/database/database.service';

@Component({
  selector: 'my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrl: './my-quotes.component.scss'
})

export class MyQuotesComponent {
  constructor(private quoteService: QuoteService, private messageService: MessageService, private database: DatabaseService) {
    this.getAllMyQuotes()
  }

  quotes: any
  allQuotes: any
  pendingQuotes: any
  acceptedQuotes: any
  canceledQuotes: any

  isLoading: boolean = false

  changeProcess(process: string) {
    this.refereshQuotes()

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
  }

  refereshQuotes() {
    this.pendingQuotes = this.allQuotes.filter((q: any) => q.process == 0)
    this.acceptedQuotes = this.allQuotes.filter((q: any) => q.process == 1)
    this.canceledQuotes = this.allQuotes.filter((q: any) => q.process == 2)
  }

  getAllMyQuotes() {
    this.isLoading = true

    let userId
    let user

    this.database.loadData('user').then(value => {
      user = value
      userId = JSON.parse(user!).id

      this.getAllMyQuotesRequest(userId)
      console.log(userId)
    })

  }

  getAllMyQuotesRequest(userId: number) {
    this.quoteService.getMyQuotes(userId).subscribe({
      next: (response) => {
        console.log(response)
        this.allQuotes = response.response
        this.pendingQuotes = response.response.filter((q: any) => q.process == 0)
        this.acceptedQuotes = response.response.filter((q: any) => q.process == 1)
        this.canceledQuotes = response.response.filter((q: any) => q.process == 2)

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

  changeStatus(data: any) {
    const quote = this.allQuotes.find((item: any) => item.id == data.id)

    console.log("keldi")
    console.log(quote)
    quote.process = data.process

    console.log(quote)
    console.log(this.allQuotes.find((item: any) => item.id == data.id))
  }
}
