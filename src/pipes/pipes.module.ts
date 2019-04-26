import { NgModule } from '@angular/core';
import { CountryImagePipe } from './country-image/country-image';
import { TransColorPipe } from './trans-color/trans-color';
import { TimePipe} from './time/time';
import {PreDatePipe} from  './pre-date/pre-date';
import {TransTextPipe} from './trans-text/trans-text'
import { BrandImagePipe } from './brand-image/brand-image';

@NgModule({
    declarations: [
        CountryImagePipe,
        TransColorPipe,
        TimePipe,
        PreDatePipe,
        TransTextPipe,
        BrandImagePipe
    ],
    imports: [

    ],
    exports: [
        CountryImagePipe,
        TransColorPipe,
        TimePipe,
        PreDatePipe,
        TransTextPipe,
        BrandImagePipe
    ]
})
export class PipesModule { }
