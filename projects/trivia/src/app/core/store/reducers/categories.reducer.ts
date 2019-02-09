import { Observable, of } from 'rxjs';
import {Action} from '@ngrx/store';

import {CategoryActions} from '../actions';
import { Category } from '../../../model';

export const categories = (state: any = [], action: CategoryActions): Category[] => {
  switch (action.type) {
    case CategoryActions.LOAD_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export const categoryDictionary = (state: any = {}, action: CategoryActions): {[key: number]: Category} => {
  switch (action.type) {
    case CategoryActions.LOAD_CATEGORIES_SUCCESS:
      let categories: Category[] = action.payload;
      const categoryDict: {[key: number]: Category} = {};
      categories.forEach(category => {
        categoryDict[category.id] = category;
      });
      return categoryDict;
    default:
      return state;
  }
};
