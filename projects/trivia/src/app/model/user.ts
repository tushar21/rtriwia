import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';


// @Injectable()

export interface User {
  userId: string;
  displayName: string;
  email: string;
  idToken?: string;
  authState: firebase.User;
  roles: any;

  /* constructor(authState: firebase.User)
  {
    if (authState) {
      this.authState = authState;
      this.userId = authState.uid;
      this.email = authState.providerData[0].email;
      this.displayName = (authState.providerData[0].displayName ? authState.providerData[0].displayName : this.email);
    }
  } */
}
