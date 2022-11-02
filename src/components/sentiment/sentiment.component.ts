import { HistoryDetail } from '../../models/historyDetail.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockQuoteService } from '../../services/stock-quote/stock-quote.service';
import { GetMonthNamePipe } from '../../pipes/get-month-name.pipe';

@Component({
  selector: 'sentiment-details',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  public symbol: string;
  public items: HistoryDetail[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockQuoteService: StockQuoteService
  ) {
    this.symbol = route.snapshot.params['symbol'];
  }

  ngOnInit() {
    this.stockQuoteService.getStockinPeriod(this.symbol, 3).subscribe((x) => {
      if (x) {
        this.items = x;
      }
    });
  }

  onBack() {
    this.router.navigateByUrl('/');
  }
}
