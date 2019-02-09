import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import { Question, User } from '../../../model';

@Injectable()
export class QuestionActions implements Action {

  type = '';
  constructor(public payload: Question[]) {}

  static LOAD_QUESTIONS = 'LOAD_QUESTIONS';
  loadQuestions(): any {
    return {
      type: QuestionActions.LOAD_QUESTIONS
    };
  }

  static LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS';
  loadQuestionsSuccess(questions: Question[]): any {
    return {
      type: QuestionActions.LOAD_QUESTIONS_SUCCESS,
      payload: questions
    };
  }

  static LOAD_UNPUBLISHED_QUESTIONS = 'LOAD_UNPUBLISHED_QUESTIONS';
  loadUnpublishedQuestions(): any {
    return {
      type: QuestionActions.LOAD_UNPUBLISHED_QUESTIONS
    };
  }

  static LOAD_UNPUBLISHED_QUESTIONS_SUCCESS = 'LOAD_UNPUBLISHED_QUESTIONS_SUCCESS';
  loadUnpublishedQuestionsSuccess(questions: Question[]): any {
    return {
      type: QuestionActions.LOAD_UNPUBLISHED_QUESTIONS_SUCCESS,
      payload: questions
    };
  }

  static LOAD_USER_QUESTIONS = 'LOAD_USER_QUESTIONS';
  loadUserQuestions(user: User): any {
    return {
      type: QuestionActions.LOAD_USER_QUESTIONS,
      payload: user as User
    };
  }

  static LOAD_USER_QUESTIONS_SUCCESS = 'LOAD_USER_QUESTIONS_SUCCESS';
  loadUserQuestionsSuccess(questions: Question[]): any {
    return {
      type: QuestionActions.LOAD_USER_QUESTIONS_SUCCESS,
      payload: questions
    };
  }

  static LOAD_SAMPLE_QUESTIONS = 'LOAD_SAMPLE_QUESTIONS';
  loadSampleQuestions(): Action {
    return {
      type: QuestionActions.LOAD_SAMPLE_QUESTIONS
    };
  }

  static LOAD_SAMPLE_QUESTIONS_SUCCESS = 'LOAD_SAMPLE_QUESTIONS_SUCCESS';
  loadSampleQuestionsSuccess(questions: Question[]): any {
    return {
      type: QuestionActions.LOAD_SAMPLE_QUESTIONS_SUCCESS,
      payload: questions
    };
  }

  static ADD_QUESTION = 'ADD_QUESTION';
  addQuestion(question: Question): any {
    return {
      type: QuestionActions.ADD_QUESTION,
      payload: question as Question
    };
  }

  static ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';
  addQuestionSuccess(): any {
    return {
      type: QuestionActions.ADD_QUESTION_SUCCESS,
      payload: null
    };
  }

  static APPROVE_QUESTION = 'APPROVE_QUESTION';
  approveQuestion(question: Question): any {
    return {
      type: QuestionActions.APPROVE_QUESTION,
      payload: question as Question
    };
  }

}
