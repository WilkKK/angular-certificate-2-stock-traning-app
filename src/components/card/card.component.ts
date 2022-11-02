import { StockQuote } from './../../models/stockQuote.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() public stockQuote: StockQuote | undefined;
  @Output() public onDeleteClicked: EventEmitter<string> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  onDelete() {
    if (this.stockQuote) {
      this.onDeleteClicked.emit(this.stockQuote.base.symbol);
    }
  }
  onDirect() {
    this.router.navigateByUrl('sentiment/' + this.stockQuote?.base.symbol);
  }
}
