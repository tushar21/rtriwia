import { Observable, of } from 'rxjs';
import {Action} from '@ngrx/store';

import { TagActions } from '../actions';

export const tags = (state: any = [], action: TagActions): string[] => {
  switch (action.type) {
    case TagActions.LOAD_TAGS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
