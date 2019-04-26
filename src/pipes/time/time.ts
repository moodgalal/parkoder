import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  transform(value: number, ...args)
  {
      let h : number = 0;
      let m : number = 0;
      let s : number = 0;

      h = Math.floor(value / 3600);
      m = Math.floor((value - (h * 3600)) / 60);
      s = Math.floor(value - (h * 3600) - (m * 60));

     h = this.checkTime(h);
     m = this.checkTime(m);
     s = this.checkTime(s);
      
      return h+": "+m+": "+s;
  }

  checkTime(x)
  {
      if(x<10 && x >-1)
          x = "0"+x;

       if (x<0)
           x = "00";

      return x.toString();
  }
}
