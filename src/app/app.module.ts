import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from '../components/search/search.component';
import { CardComponent } from '../components/card/card.component';
import { SentimentComponent } from '../components/sentiment/sentiment.component';
import { GetMonthNamePipe } from '../pipes/get-month-name.pipe';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { SpinnerInterceptor } from '../interceptor/spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CardComponent,
    SentimentComponent,
    GetMonthNamePipe,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
