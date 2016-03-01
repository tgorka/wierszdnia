import {Inject, Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class PoemService {

    constructor(private http:Http) {}

    getRandomPoem() {
        this.http.get('http://gazeta.pl')
            .map(res => res.text())
            .subscribe(
                data => this.parsePoem(data),
                err => this.logError(err),
                () => console.log('Random Quote Complete')
            );
        return "wlazl konek na plotek i mruga...";
    }

    parsePoem(poem) {
        console.log('parse poem:', poem)
    }

    logError(err) {
        console.error('There was an error: ' + err);
    }
}