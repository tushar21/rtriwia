// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import { IConfig } from './iconfig';

export const environment = {
  production: false
};

export const CONFIG: IConfig = {
  "firebaseConfig" : {
    apiKey: "AIzaSyADAiWQ86gbhh7vwhmrywnFkHKA6rGUuus",
    authDomain: "fries-bureau-student.firebaseapp.com",
    databaseURL: "https://fries-bureau-student.firebaseio.com",
    storageBucket: "fries-bureau-student.appspot.com",
    messagingSenderId: "862479508070"
  }
};
