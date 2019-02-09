import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {AppStore} from '../app-store';
import {Question, User} from '../../../model';
import {QuestionActions} from '../actions';
import {QuestionService} from '../../services'
import {map, switchMap, filter, tap} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class QuestionEffects {
    constructor (
        private actions$: Actions,
        private questionActions: QuestionActions,
        private svc: QuestionService
    ) {}

    @Effect() 
    loadQuestions$ = this.actions$
    .pipe(
        ofType(QuestionActions.LOAD_QUESTIONS)
        ,switchMap(() => this.svc.getQuestions())
        ,map((questions: Question[]) => this.questionActions.loadQuestionsSuccess(questions))
    );

    @Effect() 
    loadUnpublishedQuestions$ = this.actions$
    .pipe(
        ofType(QuestionActions.LOAD_UNPUBLISHED_QUESTIONS)
        ,switchMap(() => this.svc.getUnpublishedQuestions())
        ,map((questions: Question[]) => this.questionActions.loadUnpublishedQuestionsSuccess(questions))
    );

    @Effect()  
    loadUserQuestions$ = this.actions$.pipe(
                ofType(QuestionActions.LOAD_USER_QUESTIONS),
                switchMap((user: User) => this.svc.getUserQuestions(user)),
                map((questions: Question[]) => this.questionActions.loadUserQuestionsSuccess(questions))
            );

    @Effect() 
    loadSampleQuestions$ = this.actions$
    .pipe(
        ofType(QuestionActions.LOAD_SAMPLE_QUESTIONS)
        ,switchMap(() => this.svc.getSampleQuestions())
        ,map((questions: Question[]) => this.questionActions.loadSampleQuestionsSuccess(questions))
    );

    @Effect() 
    addQuestion$ = this.actions$.pipe(
        ofType(QuestionActions.ADD_QUESTION)
        ,tap((action: QuestionActions) => this.svc.saveQuestion(action.payload[0]))
        ,filter(() => false)
    );

    @Effect() 
    approveQuestion$ = this.actions$
    .pipe(
        ofType(QuestionActions.APPROVE_QUESTION)
        ,tap((action: QuestionActions) => this.svc.approveQuestion(action.payload[0]))
        ,filter(() => false)
    )
}
