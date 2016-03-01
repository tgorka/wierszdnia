import {bootstrap}  from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {AppComponent} from './app.component';
// Add all operators to Observable
import 'rxjs/Rx';

//enableProdMode();
bootstrap(AppComponent).catch(err => console.error(err));
