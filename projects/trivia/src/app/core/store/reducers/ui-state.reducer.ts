import { Observable, of } from 'rxjs';
import {Action} from '@ngrx/store';

import { UIStateActions } from '../actions';

export const loginRedirectUrl = (state: any = null, action: UIStateActions): string => {
  switch (action.type) {
    case UIStateActions.LOGIN_REDIRECT_URL:
      return action.payload;
    default:
      return state;
  }
};
