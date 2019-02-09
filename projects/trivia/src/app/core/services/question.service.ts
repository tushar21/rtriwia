import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import {take, map, catchError} from 'rxjs/operators';

import { User, Question, QuestionStatus } from '../../model';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';
import { QuestionActions } from '../store/actions';

@Injectable()
export class QuestionService {
  constructor(private db: AngularFireDatabase,
              private store: Store<AppStore>,
              private questionActions: QuestionActions) {
  }

  getSampleQuestions(): Observable<Question[]> {
    return this.db.list('/questions/published', ref => ref.limitToLast(4))
        .valueChanges()
        .pipe(
          map((questions: any) => {
              return questions as Question[];
          })
        )
  }

  getUserQuestions(user: User): Observable<Question[]> {
    return this.db.list('/users/' + user.userId + '/questions')
                .valueChanges()
               .pipe(map((qids: any[]) => {
                 const questions: Question[] = [];
                 qids.forEach(qid => {
                    this.db.object<Question>('/questions/' + qid['$value'] + '/' + qid['$key'])
                    .valueChanges()
                    .pipe(take(1))
                    .subscribe(q => {
                      console.log(q);
                      questions.push(q)
                    });
                 });
                 return questions;
              }),
              catchError(error => {
                console.log(error);
                return of(null);
              }));
  }

  getQuestions(): Observable<Question[]> {
    return this.db.list('/questions/published')
              .valueChanges()
              .pipe(
                catchError(error => {
                  console.log(error);
                  return of(null);
                })
              );
  }

  getUnpublishedQuestions(): Observable<Question[]> {
    return this.db.list('/questions/unpublished')
              .valueChanges()
              .pipe(
                catchError(error => {
                  console.log(error);
                  return of(null);
                })
              );
  }

  saveQuestion(question: Question) {
    this.db.list('/questions/unpublished').push(question).then(
      (ret) => {  // success
        if (ret.key) {
          this.db.object('/users/' + question.created_uid + '/questions').update({[ret.key]: 'unpublished'});
        }
        this.store.dispatch(this.questionActions.addQuestionSuccess());
      },
      (error: Error) => {// error
        console.error(error);
      }
    );
  }

  approveQuestion(question: Question) {
    let key: string = question["$key"];
    question.status = QuestionStatus.APPROVED;
    this.db.object('/questions/published').update({[key]: question}).then(
      (ret) => {  //success
        this.db.object('/users/' + question.created_uid + '/questions').update({[key]: "published"});
        this.db.object('/questions/unpublished/' + key).remove();
      },
      (error: Error) => {//error
        console.error(error);
      }
    );
  }

}
