import {Component} from 'angular2/core';

@Component({

    // Declare the tag name in index.html to where the component attaches
    selector: 'main',

    // Location of the template for this component
    templateUrl: 'html/main.html'

})
export class Main {

    // Declaring the variable for binding with initial value
    yourName: string = '';

}
