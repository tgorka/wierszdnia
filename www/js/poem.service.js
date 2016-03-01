System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var PoemService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            PoemService = (function () {
                function PoemService(http) {
                    this.http = http;
                }
                PoemService.prototype.getRandomPoem = function () {
                    var _this = this;
                    this.http.get('http://gazeta.pl')
                        .map(function (res) { return res.text(); })
                        .subscribe(function (data) { return _this.parsePoem(data); }, function (err) { return _this.logError(err); }, function () { return console.log('Random Quote Complete'); });
                    return "wlazl konek na plotek i mruga...";
                };
                PoemService.prototype.parsePoem = function (poem) {
                    console.log('parse poem:', poem);
                };
                PoemService.prototype.logError = function (err) {
                    console.error('There was an error: ' + err);
                };
                PoemService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PoemService);
                return PoemService;
            }());
            exports_1("PoemService", PoemService);
        }
    }
});
