import { Component, Input, ViewChild, Renderer2, ElementRef } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Colors } from '../../models/color';

@Component({
  selector: 'transaction',
  templateUrl: 'transaction.html',
  providers : [Colors]
})
export class TransactionComponent {

  @Input() carData = null;
  @ViewChild("element") myElement : ElementRef;
  carColor : string;

  constructor(private storage : Storage,private renderer: Renderer2 , private colorsProvider : Colors ) {

     setTimeout(()=>{
        this.carColor = this.colorsProvider.findColor(this.carData.VehicleColorID);
        if(this.carColor != null)
        {
          this.renderer.setStyle(this.myElement.nativeElement, 'border', "3px solid "+this.carColor);
          this.carData.VehicleColorID = 1;
        }
     },500)

  }


  getTime(event, car: any)
  {
    let myDate : number  = Date.now() / 1000;

    if(car.RecordStatusID !== 6)
    {
        if (car.TrxDateFrom !== null)
        {
          let date = car.TrxDateFrom;
          myDate = new Date(date).getTime() / 1000;
        }
    }
    else
    {
        if (car.RetrieveDatetime !== null)
        {
          let date = car.RetrieveDatetime;
          myDate = new Date(date).getTime() / 1000;
        }
    }

    car.timeDuration = event - myDate;
  }

}
