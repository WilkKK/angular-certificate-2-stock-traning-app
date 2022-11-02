import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GetMonthNamePipe } from 'src/pipes/get-month-name.pipe';

import { SentimentComponent } from './sentiment.component';

describe('DetailsComponent', () => {
  let component: SentimentComponent;
  let fixture: ComponentFixture<SentimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SentimentComponent, GetMonthNamePipe],
      imports: [RouterTestingModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentComponent);
    component = fixture.componentInstance;
    component.items = [
      {
        symbol: 'TSLA',
        year: 2022,
        month: 7,
        change: -3500,
        mspr: -5.785124,
      },
      {
        symbol: 'TSLA',
        year: 2022,
        month: 8,
        change: -7943357,
        mspr: -99.517654,
      },
      {
        symbol: 'TSLA',
        year: 2022,
        month: 9,
        change: -605,
        mspr: -0.3324669,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render element with id: backBtn', () => {
    const backBtn =
      fixture.debugElement.nativeElement.querySelector('#backBtn');
    expect(backBtn).toBeTruthy();
  });

  const testCase = [
    {
      searchTag: 'span',
      value: 'Change: -3500',
      property: 'Change',
    },
    {
      searchTag: 'span',
      value: 'MSPR: -5.785124',
      property: 'MSPR',
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

  it('should render red arrow, change is negative', () => {
    const arrowDown =
      fixture.debugElement.nativeElement.querySelector('.arrow-down');
    expect(arrowDown).toBeTruthy();
  });

  it('should render green arrow, change is positive', () => {
    component.items = [
      {
        symbol: 'TSLA',
        year: 2022,
        month: 7,
        change: 3500,
        mspr: 5.785124,
      },
      {
        symbol: 'TSLA',
        year: 2022,
        month: 8,
        change: 7943357,
        mspr: 99.517654,
      },
      {
        symbol: 'TSLA',
        year: 2022,
        month: 9,
        change: 605,
        mspr: 0.3324669,
      },
    ];
    fixture.detectChanges();
    const arrowUp =
      fixture.debugElement.nativeElement.querySelector('.arrow-up');
    expect(arrowUp).toBeTruthy();
  });
});
