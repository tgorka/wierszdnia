var browser_1 = require('angular2/platform/browser');
var app_component_1 = require('./app.component');
// Add all operators to Observable
require('rxjs/Rx');
//enableProdMode();
browser_1.bootstrap(app_component_1.AppComponent).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map