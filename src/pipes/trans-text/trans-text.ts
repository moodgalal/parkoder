import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transText',
})
export class TransTextPipe implements PipeTransform {


  transform(value: number, ...args) {
    let text;

    if (value == 0)
      text = "Queue In";
    else if (value == 1)
      text = "In Process";
    else if (value == 2)
      text = "Data Missed";
    else if (value == 3)
      text = "Queue Out";
    else if (value == 4)
      text = "Out Process";
    else if (value == 6)
      text = "In Process";
    return text;
  }
}
