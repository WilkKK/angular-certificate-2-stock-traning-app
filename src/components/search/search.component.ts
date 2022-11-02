import { StockQuote } from './../../models/stockQuote.model';
import { forkJoin } from 'rxjs';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { StockQuoteService } from '../../services/stock-quote/stock-quote.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  inputValue: string = '';
  noData: boolean = false;
  duplicate: boolean = false;

  choosenStocks: StockQuote[] | undefined;

  private localSorageKey = 'stockQuoteCompany';
  constructor(private stockQuoteService: StockQuoteService) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.saveDataToLocalStorage();
  }

  ngOnInit(): void {
    const itemsinLocalstorage = localStorage.getItem(this.localSorageKey);
    if (itemsinLocalstorage) {
      this.choosenStocks = JSON.parse(itemsinLocalstorage);
    }
  }

  ngOnDestroy(): void {
    this.saveDataToLocalStorage();
  }

  onDelete(symbol: string): void {
    if (this.choosenStocks) {
      this.choosenStocks = this.choosenStocks.filter(
        (x) => x.base.symbol !== symbol
      );
    }
  }

  onSearch(): void {
    if (this.inputValue) {
      this.noData = false;
      this.duplicate = false;
      if (!this.isDuplicate()) {
        this.getSearchElement();
      } else {
        this.duplicate = true;
      }
    }
  }

  private saveDataToLocalStorage() {
    localStorage.removeItem(this.localSorageKey);
    if (this.choosenStocks && this.choosenStocks.length !== 0) {
      localStorage.setItem(
        this.localSorageKey,
        JSON.stringify(this.choosenStocks)
      );
    }
  }

  private isDuplicate(): boolean {
    if (this.choosenStocks && this.choosenStocks.length !== 0) {
      let duplicate = this.choosenStocks.find(
        (x) => x.base.symbol.toUpperCase() === this.inputValue.toUpperCase()
      );
      return !!duplicate;
    }
    return false;
  }

  private getSearchElement(): void {
    forkJoin({
      company: this.stockQuoteService.getCompanyName(this.inputValue),
      value: this.stockQuoteService.getCurrectData(this.inputValue),
    }).subscribe((result) => {
      if (result.company && result.value) {
        const findElement: StockQuote = {
          base: result.company,
          value: result.value,
        };
        this.choosenStocks
          ? this.choosenStocks.push(findElement)
          : (this.choosenStocks = [findElement]);
        this.saveDataToLocalStorage();
      } else {
        this.noData = true;
      }
    });
  }
}
