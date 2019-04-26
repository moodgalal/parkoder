import { Component , Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'duration',
  template: ''
})
export class DurationComponent {

  @Output() timeEvent: EventEmitter<any> = new EventEmitter(true);


  constructor() {
    setInterval(()=>
    {
        let nowMilleSeconds  = Date.now();
        let  nowSeconds = Math.floor(nowMilleSeconds/1000);

      this.timeEvent.emit(nowSeconds);
    } , 500)
  }
}
