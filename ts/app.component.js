var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var poem_service_1 = require('./poem.service');
var AppComponent = (function () {
    function AppComponent(poemService) {
        this.poemService = poemService;
        // properties
        this.authorUrl = 'http://tomasz.gorka.org.pl';
    }
    AppComponent = __decorate([
        core_1.Component({
            // Declare the tag name in index.html to where the component attaches
            selector: 'app',
            providers: [http_1.HTTP_PROVIDERS, poem_service_1.PoemService],
            // Location of the template for this component
            templateUrl: 'html/app.html'
        })
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map