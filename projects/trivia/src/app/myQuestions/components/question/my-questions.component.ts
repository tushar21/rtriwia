import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppStore } from '../../../core/store/app-store';
import { QuestionActions } from '../../../core/store/actions';
import { User, Question, Category } from '../../../model';
import { take } from 'rxjs/operators'
@Component({
  selector: 'my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit, OnDestroy {
  questionsObs: Observable<Question[]>;
  categoryDictObs: Observable<{[key: number]: Category}>;
  user: User;

  constructor(private store: Store<AppStore>,
              private questionActions: QuestionActions) {
    this.questionsObs = store.select(s => s.userQuestions);
    this.categoryDictObs = store.select(s => s.categoryDictionary);
  }

  ngOnInit() {
    this.store.pipe(take(1)).subscribe(s => this.user = s.user);
    this.store.dispatch(this.questionActions.loadUserQuestions(this.user));
  }

  ngOnDestroy() {
  }

}
