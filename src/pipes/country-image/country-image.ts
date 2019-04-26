import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryImage',
})
export class CountryImagePipe implements PipeTransform {

  transform(value: number, ...args) {
    let iconName: string;

    if (value == 1)
      iconName = "assets/falgs-icons/Bahrain.png";
    else if (value == 5)
      iconName = "assets/falgs-icons/Kuwait.png";

    else if (value == 3)
      iconName = "assets/falgs-icons/Qatar.png";

    else if (value == 2)
      iconName = "assets/falgs-icons/Saudi-Arabia.png";

    else if (value == 4)
      iconName = "assets/falgs-icons/United-Arab-Emirates.png";

    else if (value == 6)
      iconName = "assets/falgs-icons/Oman.png";

    else
      iconName = "assets/falgs-icons/all.jpg";

    return iconName;
  }
}
