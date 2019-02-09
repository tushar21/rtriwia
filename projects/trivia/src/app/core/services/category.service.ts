import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'


import { Category } from '../../model/category';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  getCategories(): Observable<Category[]> {
    return this.db.list('/categories').valueChanges().pipe(
      map(categories => {
        return categories as Category[]
      })
    );
  }
}
