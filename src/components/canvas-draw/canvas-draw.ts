import {AfterViewInit, Component, Renderer2, ViewChild} from '@angular/core';
import {Platform, ViewController} from "ionic-angular";
import { drawDOM, exportPDF, DrawOptions, Group  } from '@progress/kendo-drawing';

@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent implements AfterViewInit{

  @ViewChild('myCanvas') canvas : any;

    canvasElement : any;
    lastX : number;
    lastY : number;
    image : any;
    ctx : any;

  constructor(private viewCtrl : ViewController, private platform : Platform , private rendrer : Renderer2)
  {}


  ngAfterViewInit()
  {
    console.log("in the draw component");

    this.canvasElement = this.canvas.nativeElement;

    console.log(this.canvas);

    this.rendrer.setAttribute(this.canvasElement , 'width' , this.platform.width() + '');
    this.rendrer.setAttribute(this.canvasElement , 'height' , this.platform.height() + '');

    }

  handleStart(ev)
  {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  handleMovement(ev)
  {

    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    this.ctx = this.canvasElement.getContext("2d");

    this.ctx.beginPath();
    this.ctx.lineJoin = "round";
    this.ctx.moveTo(this.lastX , this.lastY);
    this.ctx.lineTo(currentX , currentY);
    this.ctx.closePath();
    this.ctx.strokeStyle = "#e30000";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  }

  handleEnd(ev)
  {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  clearCanvas()
  {
    this.ctx.clearRect(0,0,this.platform.width() , this.platform.height());
  }

  exportElement(element: HTMLElement, options?: DrawOptions)
  {
    drawDOM(element, options).then((group: Group) =>
    {
      return exportPDF(group);
    }).then((dataUri) => {
       console.log(dataUri);
      this.viewCtrl.dismiss();
    });
  }
}
