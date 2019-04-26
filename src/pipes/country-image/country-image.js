var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var CountryImagePipe = (function () {
    function CountryImagePipe() {
    }
    CountryImagePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var iconName;
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
            iconName = "assets/falgs-icons/Bahrain.png";
        return iconName;
    };
    return CountryImagePipe;
}());
CountryImagePipe = __decorate([
    Pipe({
        name: 'countryImage',
    })
], CountryImagePipe);
export { CountryImagePipe };
//# sourceMappingURL=country-image.js.map