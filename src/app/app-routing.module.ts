import { SentimentComponent } from '../components/sentiment/sentiment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../components/search/search.component';

const routes: Routes = [
  { path: 'sentiment/:symbol', component: SentimentComponent },
  { path: '**', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
