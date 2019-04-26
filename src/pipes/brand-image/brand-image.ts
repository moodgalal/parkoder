import { Pipe, PipeTransform } from '@angular/core';
import { Brands } from '../../models/brands';

@Pipe({
  name: 'brandImage'
})
export class BrandImagePipe implements PipeTransform {

  transform(id: number, ...args) {
      if(id)
      {
        let iconName: string = this.findBrandImg(id);
        return "assets/car-brands/"+iconName;
      }
  }

  findBrandImg(myId : number) : string
  {
    let brand = Brands.brandsList.find(x => x.brandId === myId);
      return brand.image;   
  }
}


