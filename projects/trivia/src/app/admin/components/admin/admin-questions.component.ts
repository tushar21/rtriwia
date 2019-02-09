import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppStore } from '../../../core/store/app-store';
import { QuestionActions } from '../../../core/store/actions';
import { User, Question, Category } from '../../../model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.scss']
})
export class AdminQuestionsComponent implements OnInit, OnDestroy {
  questionsObs: Observable<Question[]>;
  unpublishedQuestionsObs: Observable<Question[]>;
  categoryDictObs: Observable<{[key: number]: Category}>;

  constructor(private store: Store<AppStore>,
              private questionActions: QuestionActions) {
    this.questionsObs = store.select(s => s.questions);
    this.unpublishedQuestionsObs = store.select(s => s.unpublishedQuestions);
    this.categoryDictObs = store.select(s => s.categoryDictionary);
  }

  ngOnInit() {
    this.store.dispatch(this.questionActions.loadUnpublishedQuestions());
  }

  ngOnDestroy() {
  }

  approveQuestion(question: Question) {
    let user: User;

    this.store.pipe(take(1)).subscribe(s => user = s.user);
    question.approved_uid = user.userId;

    this.store.dispatch(this.questionActions.approveQuestion(question));
  }

}
