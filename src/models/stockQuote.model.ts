import { StockQuoteValue } from './stockQuoteValue.model';
import { StockQuoteBase } from './stockQuoteBase.model';
export interface StockQuote {
    base: StockQuoteBase;
    value: StockQuoteValue;
}
