
import {Injectable, Inject} from '@angular/core';
import {Action} from '@ngrx/store';

import { User } from '../../../model';

/* interface User {
  userId: string;
  displayName: string;
  email: string;
  idToken?: string;
  authState: firebase.User;
  roles: any;
} */

@Injectable()
export class UserActions implements Action {
  type = '';
  /* constructor(public payload: User) {} */

  static LOGOFF = 'LOGOFF';
  logoff(): any {
    return {
      type: UserActions.LOGOFF,
      payload: null
    };
  }

  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  loginSuccess(user: User): any {
    return {
      type: UserActions.LOGIN_SUCCESS,
      payload: user as User
    };
  }

  static ADD_USER_WITH_ROLES = 'ADD_USER_WITH_ROLES';
  addUserWithRoles(user: User): any {
    return {
      type: UserActions.ADD_USER_WITH_ROLES,
      payload: user as User
    };
  }

}
