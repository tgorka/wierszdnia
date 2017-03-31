import {Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material/all";
import {HTTP_PROVIDERS} from 'angular2/http';

import {PoemService} from './poem.service';

@Component({

    // Declare the tag name in index.html to where the component attaches
    selector: 'app',

    providers: [HTTP_PROVIDERS, PoemService],

    directives: [MATERIAL_DIRECTIVES],

    // Location of the template for this component
    templateUrl: 'html/app.html'
    //template: '<h1>Angular 2 App</h1>'

})
export class AppComponent {

    // properties
    private authorUrl:string = 'http://tomasz.gorka.org.pl';

    constructor(public poemService: PoemService) {
    }

}