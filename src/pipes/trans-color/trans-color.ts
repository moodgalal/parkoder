import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transColor',
})
export class TransColorPipe implements PipeTransform {

  transform(value: number, ...args)
  {
     let color : string;

     if (value == 0)
       color = "green";
     else if(value == 1)
       color = "yellow";
     else if (value == 2)
         color = "blue";
     else if (value == 3)
         color = "red";
     else if (value == 4)
       color = "purple";
     else if (value == 6)
       color = "yellow";
    return color
  }
}
