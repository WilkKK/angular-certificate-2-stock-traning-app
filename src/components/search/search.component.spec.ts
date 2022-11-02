import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { StockQuoteService } from 'src/services/stock-quote/stock-quote.service';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockService = jasmine.createSpyObj(['getCompanyName', 'getCurrectData']);
  mockService.getCompanyName.and.returnValue(
    of({
      description: 'TESLA INC',
      displaySymbol: 'TSLA',
      symbol: 'TSLA',
      type: 'Common Stock',
    })
  );
  mockService.getCurrectData.and.returnValue(
    of({
      c: 223.07,
      d: -15.06,
      dp: -6.3243,
      h: 234.5715,
      l: 222.02,
      o: 233.935,
      pc: 238.13,
      t: 1665172804,
    })
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [
        HttpClient,
        { provide: StockQuoteService, useValue: mockService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render element with id: stockInput', () => {
    const stockInput =
      fixture.debugElement.nativeElement.querySelector('#stockInput');
    expect(stockInput).toBeTruthy();
  });

  it('should render element with id: stockInput', () => {
    const stockInput =
      fixture.debugElement.nativeElement.querySelector('#trackBtn');
    expect(stockInput).toBeTruthy();
  });

  it('shoulde add element to list after search', fakeAsync(() => {
    localStorage.clear();
    component.choosenStocks = [];
    fixture.detectChanges();
    component.inputValue = 'tsla';
    component.onSearch();
    fixture.detectChanges();
    expect(component.choosenStocks?.length).toEqual(1);
  }));

  it('should get data from local storage during init app', fakeAsync(() => {
    localStorage.clear();
    component.choosenStocks = [];
    fixture.detectChanges();
    component.inputValue = 'tsla';
    component.onSearch();
    fixture.detectChanges();
    component.ngOnDestroy();
    component.ngOnInit();
    expect(component.choosenStocks?.length).toEqual(1);
  }));
});
