import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuoteService } from '../../../service/quote/quote.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'quote-card',
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.scss'
})
export class QuoteCardComponent {
  @Input() data: any
  @Input() adminFunctions!: boolean
  @Output() changeStatus = new EventEmitter()

  constructor(private quoteService: QuoteService, private messageService: MessageService) { }

  acceptLoading: boolean = false
  cancelLoading: boolean = false

  changeProcess(process: number, command: string) {
    if (command == "accept") {
      this.acceptLoading = true
    }
    else if (command == "cancel") {
      this.cancelLoading = true
    }

    this.quoteService.changeProcess(this.data.id, process).subscribe({
      next: (response) => {
        this.data.process = process

        console.log("axir men bosildimku")
        this.changeStatus.emit({id:this.data.id,process:process})

        this.acceptLoading = false
        this.cancelLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadur xato ketdi!' });

        this.acceptLoading = false
        this.cancelLoading = false
      }
    })
  }
}