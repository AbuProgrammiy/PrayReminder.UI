import { Component, Input } from '@angular/core';

@Component({
  selector: 'quote-card',
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.scss'
})
export class QuoteCardComponent {
  @Input() data!:Data
}

type Data = {
  firstName: string | null,
  lastName: string | null,
  username: string| null,
  quote:string,
  author:string,
  process:number
}