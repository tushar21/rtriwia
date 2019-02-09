import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class UIStateActions {

  type = '';
  /* constructor(public payload: string) {} */

  static LOGIN_REDIRECT_URL = 'LOGIN_REDIRECT_URL';
  setLoginRedirectUrl(url?: string): any {
    return {
      type: UIStateActions.LOGIN_REDIRECT_URL,
      payload: url
    };
  }

}
