# Wiersz Dnia

Presenting poem of the day


## Build properties

set properties in build.json file in the main folder structure 
with the information about credentials for signing applications.

```json
{
     "android": {
         "debug": {
             "keystore": "..\android.keystore",
             "storePassword": "android",
             "alias": "mykey1",
             "password" : "password",
             "keystoreType": ""
         },
         "release": {
             "keystore": "..\android.keystore",
             "storePassword": "",
             "alias": "mykey2",
             "password" : "password",
             "keystoreType": ""
         }
     }
 }
```