var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
var DurationComponent = (function () {
    function DurationComponent() {
        var _this = this;
        this.timeEvent = new EventEmitter(true);
        setInterval(function () {
            var nowMilleSeconds = Date.now();
            var nowSeconds = Math.floor(nowMilleSeconds / 1000);
            _this.timeEvent.emit(nowSeconds);
        }, 500);
    }
    return DurationComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DurationComponent.prototype, "timeEvent", void 0);
DurationComponent = __decorate([
    Component({
        selector: 'duration',
        template: ''
    }),
    __metadata("design:paramtypes", [])
], DurationComponent);
export { DurationComponent };
//# sourceMappingURL=duration.js.map