import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Category} from '../../../model';

@Injectable()
export class CategoryActions implements Action {
  type = '';
  constructor(public payload: Category[]) {}

  static LOAD_CATEGORIES = 'LOAD_CATEGORIES';
  loadCategories(): any {
    return {
      type: CategoryActions.LOAD_CATEGORIES
    };
  }

  static LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';
  loadCategoriesSuccess(categories: Category[]): any {
    return {
      type: CategoryActions.LOAD_CATEGORIES_SUCCESS,
      payload: categories
    };
  }

}
