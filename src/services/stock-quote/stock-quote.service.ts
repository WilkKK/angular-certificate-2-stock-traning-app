import { HistoryDetail } from './../../models/historyDetail.model';
import { StockQuoteBase } from './../../models/stockQuoteBase.model';
import { StockQuoteDto } from './../../models/stockQuoteDto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StockQuoteValue } from '../../models/stockQuoteValue.model';
import { StockQuoteValueDto } from '../../models/stockQuoteValueDto.model';
import { HistoryDetailDto } from '../../models/historyDetailDto.model';

@Injectable({
  providedIn: 'root',
})
export class StockQuoteService {
  constructor(private http: HttpClient) {}

  configUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  getCurrectData(symbol: string): Observable<StockQuoteValue> {
    return this.http
      .get<StockQuoteValueDto>(
        this.configUrl + 'quote?symbol=' + symbol.toUpperCase() + this.token
      )
      .pipe(map((el) => this.mapValueDtoToValue(el)));
  }

  getCompanyName(symbol: string): Observable<StockQuoteBase | undefined> {
    return this.http
      .get<StockQuoteDto>(
        this.configUrl + 'search?q=' + symbol.toUpperCase() + this.token
      )
      .pipe(map((list) => this.filterBySymbole(list, symbol)));
  }

  getStockinPeriod(
    symbol: string,
    period: number
  ): Observable<HistoryDetail[]> {
    const to: string = this.getPerviousMonth();
    const from: string = this.getDateCalculateByPeriod(period);
    return this.http
      .get<HistoryDetailDto>(
        this.configUrl +
          `/stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}${this.token}`
      )
      .pipe(map((elemnt) => elemnt.data));
  }

  private getPerviousMonth(): string {
    const toDate = new Date();
    toDate.setMonth(toDate.getMonth() - 1);
    return toDate.toISOString().split('T')[0];
  }

  private getDateCalculateByPeriod(period: number): string {
    const today = new Date();
    today.setMonth(today.getMonth() - period);
    return today.toISOString().split('T')[0];
  }

  private filterBySymbole(
    list: StockQuoteDto,
    symbol: string
  ): StockQuoteBase | undefined {
    const result: StockQuoteBase | undefined = list.result.find(
      (x) => x.symbol.toUpperCase() === symbol.toUpperCase()
    );
    return result;
  }

  private mapValueDtoToValue(valueDto: StockQuoteValueDto): StockQuoteValue {
    return {
      currentPrice: valueDto.c,
      change: valueDto.d,
      precentChange: valueDto.dp,
      highPriceOfTheDay: valueDto.h,
      lowPriceOfTheDay: valueDto.l,
      openPriceOfTheDay: valueDto.o,
      previousPriceOfTheDay: valueDto.pc,
    };
  }
}
