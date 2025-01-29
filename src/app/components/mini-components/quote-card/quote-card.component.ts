import { Component, Input } from '@angular/core';

@Component({
  selector: 'quote-card',
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.scss'
})
export class QuoteCardComponent {
  @Input() data:any
}