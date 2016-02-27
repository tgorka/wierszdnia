import {Component} from 'angular2/core';

@Component({

    // Declare the tag name in index.html to where the component attaches
    selector: 'app',

    // Location of the template for this component
    templateUrl: 'html/app.html'
    //template: '<h1>Angular 2 App</h1>'

})
export class AppComponent {

    // Declaring the variable for binding with initial value
    yourName: string = 'test5';

}