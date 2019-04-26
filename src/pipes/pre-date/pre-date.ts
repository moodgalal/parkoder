import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preDate',
})
export class PreDatePipe implements PipeTransform {

  transform(value: Date, ...args)
  {
      if (value)
      {
          let day  = value.getDate();
          let month = value.getMonth()+1;
          console.log(month);
          let year = value.getFullYear();

          return `${day}/${month}/${year}`;
      }
  }
}
