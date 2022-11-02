import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getmonthname'
})
export class GetMonthNamePipe implements PipeTransform {
  transform(value: number, args?: any): any {
    const monthNames  = [ '','JANUARY', 'FEBURARY','MARCH', 'APRIL','MAY','JUNE','JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return monthNames[value];
  }

}
