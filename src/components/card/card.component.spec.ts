import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.stockQuote = {
      base: {
        description: 'TESLA INC',
        displaySymbol: 'TSLA',
        symbol: 'TSLA',
        type: 'Common Stock',
      },
      value: {
        currentPrice: 223.07,
        change: -15.06,
        precentChange: -6.3243,
        highPriceOfTheDay: 234.5715,
        lowPriceOfTheDay: 222.02,
        openPriceOfTheDay: 233.935,
        previousPriceOfTheDay: 238.13,
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const testCase = [
    {
      searchTag: 'h2',
      value: 'TESLA INC',
      property: 'name',
    },
    {
      searchTag: 'span',
      value: 'Change today: -15.06%',
      property: 'Change today',
    },
    {
      searchTag: 'span',
      value: 'Opening price: $233.935',
      property: 'Opening price',
    },
    {
      searchTag: 'span',
      value: 'Current price: $223.07',
      property: 'Current price',
    },
    {
      searchTag: 'span',
      value: 'High price: $234.5715',
      property: 'High price',
    },
  ];

  testCase.forEach((item) => {
    it(`should display ${item.property}`, () => {
      const name = item.value;
      const displayName = Array.from(
        fixture.debugElement.nativeElement.querySelectorAll(item.searchTag)
      ).find((el) => (el as HTMLElement).textContent === name);
      expect(displayName).toBeTruthy();
    });
  });

  it('should render element with id: removeTSLA', () => {
    const removeTSLA =
      fixture.debugElement.nativeElement.querySelector('#removeTSLA');
    expect(removeTSLA).toBeTruthy();
  });

  it('should render element with id: sentimentTSLA', () => {
    const sentimentTSLA =
      fixture.debugElement.nativeElement.querySelector('#sentimentTSLA');
    expect(sentimentTSLA).toBeTruthy();
  });

  it('should render red arrow, change is negative', () => {
    const arrowDown =
      fixture.debugElement.nativeElement.querySelector('.arrow-down');
    expect(arrowDown).toBeTruthy();
  });

  it('should render green arrow, change is positive', () => {
    component.stockQuote = {
      base: {
        description: 'TESLA INC',
        displaySymbol: 'TSLA',
        symbol: 'TSLA',
        type: 'Common Stock',
      },
      value: {
        currentPrice: 223.07,
        change: 15.06,
        precentChange: 6.3243,
        highPriceOfTheDay: 234.5715,
        lowPriceOfTheDay: 222.02,
        openPriceOfTheDay: 233.935,
        previousPriceOfTheDay: 238.13,
      },
    };
    fixture.detectChanges();
    const arrowUp =
      fixture.debugElement.nativeElement.querySelector('.arrow-up');
    expect(arrowUp).toBeTruthy();
  });
});
