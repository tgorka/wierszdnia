import {Inject, Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

interface Poem {
    id:String;
    content:String;
    name:String,
    date:Date;
}

@Injectable()
export class PoemService {

    // properties
    private headers: Headers;
    private url: String;
    private today:Date;

    private poem:Poem;

    constructor(private http:Http) {
        this.url = 'https://pafmon-walt-whitman-poems.p.mashape.com/poems';

        this.headers = new Headers();
        this.headers.append('X-Mashape-Key', 'KH1XkEAJffmshJPYDitcWCFu2WQap1dxX3Vjsn4r2K0K95C8vA');
        this.headers.append('Accept', 'application/json');

        // set date and change it every day
        this.today = new Date();
        setInterval(() => {
            this.today = new Date();
        }, 1000*60*60*24); // change every 24h

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
        this.download(this.poemsUrl(), function(data) { self.parsePoems(data) });
    }

    private downloadPoem(poem:String) {
        var self = this;
        this.download(this.poemUrl(poem), function(data) { self.parsePoem(data) });
    }

    private download(url:String, parseFun) {
        console.log('down', this.poem, url)
        this.http.get(url, { headers: this.headers })
            .map(res => res.json())
            .subscribe(
                data => parseFun(data),
                err => this.logError(err),
                () => console.log('Random Quote Complete')
            );
    }

    private parsePoem(poem) {
        // set poem name and content
        this.poem.name = poem.title;
        this.poem.content = poem.text;
    }

    private parsePoems(poems) {
        // set random poem id
        var randomIndex = Math.floor(Math.random() * poems.length);
        this.poem.id = poems[randomIndex];
        //download this random poem
        this.downloadPoem(this.poem.id);
    }

    private poemUrl(poemId:String) {
        return this.url + '/' + poemId;
    }

    private poemsUrl() {
        return this.url;
    }

    private logError(err) {
        console.error('There was an error: ' + err);
    }
}