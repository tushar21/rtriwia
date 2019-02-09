import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
// import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TagService {

  constructor(private db: AngularFireDatabase) { 
  }

  getTags(): Observable<string[]> {
    // console.log(firebase.app().options);
    return this.db.list('/tagList').valueChanges().pipe(map(t => t.map(a => a['$value'])));
  }
}
