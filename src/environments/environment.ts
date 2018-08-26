// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBPDLN6Hemz2rrSmjT5H89LAaZbJz4_oi0',
    authDomain: 'ng-fitness-tracker-c530f.firebaseapp.com',
    databaseURL: 'https://ng-fitness-tracker-c530f.firebaseio.com',
    projectId: 'ng-fitness-tracker-c530f',
    storageBucket: 'ng-fitness-tracker-c530f.appspot.com',
    messagingSenderId: '934552538207'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
