import {Inject, Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

interface Poem {
    id:string;
    content:string;
    name:string,
    date:Date;
}

interface ServicePoem {
    index:string,
    title:string,
    text:string,
}

declare type Callback = (data:Object) => void;

@Injectable()
export class PoemService {

    // properties
    private headers: Headers;
    private url: string;
    private today:Date;
    private changingCount:Number;
    private poem:Poem;

    constructor(private http:Http) {
        this.changingCount = 1000*60*60*24; // 24h
        this.url = 'https://pafmon-walt-whitman-poems.p.mashape.com/poems';

        this.headers = new Headers();
        this.headers.append('X-Mashape-Key', 'KH1XkEAJffmshJPYDitcWCFu2WQap1dxX3Vjsn4r2K0K95C8vA');
        this.headers.append('Accept', 'application/json');

        // set date and change it every day
        this.today = new Date();
        setInterval(() => {
            this.today = new Date();
        }, this.changingCount); // change every 24h

        this.poem = null;
    }

    public todaysPoem() {
        if (this.poem == null || this.poem.date != this.today) {
            this.randomPoem();
        }

        return (this.poem != null && this.poem.content != null) ?
                this.poem.content : 'Loading poem...';
    }

    public todaysPoemName() {
        if (this.poem == null || this.poem.date != this.today) {
            this.randomPoem();
        }

        return (this.poem != null && this.poem.name != null) ?
            this.poem.name : '';
    }

    public randomPoem() {
        // set poem with date and id
        this.poem = {
            date: this.today,
            id: null,
            name: null,
            content: null
        };
        // downloand poems
        this.downloadPoems();
    }

    private downloadPoems() {
        var self = this;
        this.download(this.poemsUrl(), function(data:Array<string>) { self.parsePoems(data) });
    }

    private downloadPoem(poem:string) {
        var self = this;
        this.download(this.poemUrl(poem), function(data:ServicePoem) { self.parsePoem(data) });
    }

    private download(url:string, parseFun:Callback) {
        this.http.get(url, { headers: this.headers })
            .map(res => res.json())
            .subscribe(
                data => parseFun(data),
                err => this.logError(err),
                () => console.log('Random Quote Complete')
            );
    }

    private parsePoem(poem:ServicePoem) {
        // set poem name and content
        this.poem.name = poem.title;
        this.poem.content = poem.text;
    }

    private parsePoems(poems:Array<string>) {
        // set random poem id
        var randomIndex = Math.floor(Math.random() * poems.length);
        this.poem.id = poems[randomIndex];
        //download this random poem
        this.downloadPoem(this.poem.id);
    }

    private poemUrl(poemId:string) {
        return this.url + '/' + poemId;
    }

    private poemsUrl() {
        return this.url;
    }

    private logError(err:Object) {
        console.error('There was an error: ' + err);
    }
}