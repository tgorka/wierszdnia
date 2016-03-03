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
                    var _this = this;
                    this.http = http;
                    this.changingCount = 1000 * 60 * 60 * 24; // 24h
                    this.url = 'https://pafmon-walt-whitman-poems.p.mashape.com/poems';
                    this.headers = new http_1.Headers();
                    this.headers.append('X-Mashape-Key', 'KH1XkEAJffmshJPYDitcWCFu2WQap1dxX3Vjsn4r2K0K95C8vA');
                    this.headers.append('Accept', 'application/json');
                    // set date and change it every day
                    this.today = new Date();
                    setInterval(function () {
                        _this.today = new Date();
                    }, this.changingCount); // change every 24h
                    this.poem = null;
                }
                PoemService.prototype.todaysPoem = function () {
                    if (this.poem == null || this.poem.date != this.today) {
                        this.randomPoem();
                    }
                    return (this.poem != null && this.poem.content != null) ?
                        this.poem.content : 'Loading poem...';
                };
                PoemService.prototype.todaysPoemName = function () {
                    if (this.poem == null || this.poem.date != this.today) {
                        this.randomPoem();
                    }
                    return (this.poem != null && this.poem.name != null) ?
                        this.poem.name : '';
                };
                PoemService.prototype.randomPoem = function () {
                    // set poem with date and id
                    this.poem = {
                        date: this.today,
                        id: null,
                        name: null,
                        content: null
                    };
                    // downloand poems
                    this.downloadPoems();
                };
                PoemService.prototype.downloadPoems = function () {
                    var self = this;
                    this.download(this.poemsUrl(), function (data) { self.parsePoems(data); });
                };
                PoemService.prototype.downloadPoem = function (poem) {
                    var self = this;
                    this.download(this.poemUrl(poem), function (data) { self.parsePoem(data); });
                };
                PoemService.prototype.download = function (url, parseFun) {
                    var _this = this;
                    this.http.get(url, { headers: this.headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return parseFun(data); }, function (err) { return _this.logError(err); });
                };
                PoemService.prototype.parsePoem = function (poem) {
                    // set poem name and content
                    this.poem.name = poem.title;
                    this.poem.content = poem.text;
                };
                PoemService.prototype.parsePoems = function (poems) {
                    // set random poem id
                    var randomIndex = Math.floor(Math.random() * poems.length);
                    this.poem.id = poems[randomIndex];
                    //download this random poem
                    this.downloadPoem(this.poem.id);
                };
                PoemService.prototype.poemUrl = function (poemId) {
                    return this.url + '/' + poemId;
                };
                PoemService.prototype.poemsUrl = function () {
                    return this.url;
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
