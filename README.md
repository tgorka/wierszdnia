# Wiersz Dnia

Presenting poem of the day


## Build properties

set properties in build.json file in the main folder structure 
with the information about credentials for signing applications.

NOTE: for android if you'll fail to sign and application in debug mode
maybe the 365 days of self-signed certificate has timeout. To fix that just 
delete the debug keystore from your filesystem and after next build it will 
be generated again.

```json
{
     "android": {
         "debug": {
             "keystore": "~/.android/debug.keystore",
             "storePassword": "android",
             "alias": "androiddebugkey",
             "password" : "android",
             "keystoreType": ""
         },
         "release": {
             "keystore": "../android.keystore",
             "storePassword": "",
             "alias": "mykey2",
             "password" : "password",
             "keystoreType": ""
         }
     }
 }
```