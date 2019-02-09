import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { User, GameOptions, Game, Question, PlayerQnA } from '../../model';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';
import { GameActions } from '../store/actions';
import { Utils } from '../services/utils';

@Injectable()
export class GameService {
  constructor(private db: AngularFireDatabase,
              private http: Http,
              private store: Store<AppStore>,
              private gameActions: GameActions) { 
  }

  createNewGame(gameOptions: GameOptions, user: User): Observable<string> {
    const gameIdSubject = new Subject<string>();
    const game: Game = new Game(gameOptions, user.userId);
    this.db.list('/games').push(game.getDbModel()).then(
      (ret) => {  // success
        const gameId: string = ret.key;
        if (gameId) {
          this.db.object('/users/' + user.userId + '/games/active').update({[gameId]: "true"});
          gameIdSubject.next(gameId)
        }
      },
      (error: Error) => {// error
        console.error(error);
      }
    );
    return gameIdSubject;
  }

  getActiveGames(user: User): Observable<string[]>{
    return this.db.list('/users/' + user.userId + '/games/active')
            .valueChanges()
            .pipe(map(gids => gids.map(gid => gid['$key'])))
            ; // game ids
  }

  getGame(gameId: string, user: User): Observable<Game> {
    return this.db.object('/games/' + gameId)
              .valueChanges()
              .pipe(
                map(dbGame => {
                  // console.log(dbGame);
                  return Game.getViewModel(dbGame);
                }),
                catchError(error => {
                  console.log(error);
                  return of(null);
                })
              );
  }

// http

  getNextQuestion(game: Game, user: User): Observable<Question> {
    const url: string = 'http://localhost:5001/fries-bureau-student/us-central1/app/getNextQuestion/';
    const headers = new Headers({'Authorization': 'Bearer ' + user.idToken});

    return this.http.get(url + game.gameId, {'headers': headers})
    .pipe(map(res => res.json()));
  }
/*
  getNextQuestion(game: Game, user: User): Observable<Question[]> {
    //let random = Utils.getRandomInt(1, 20);
    return this.db.list('/questions/published', {
      query: {
        limitToLast: 1
      }
    }).map(qs => 
      qs.map(q => {
        q["id"] = q['$key']; //map key to quesion id
        //this.addQuestionToGame(game, user, q);
        return q
      })
    );
  }
*/
  addQuestionToGame(game: Game, user: User, question: Question) {

    const playerQnA: PlayerQnA = game.addPlayerQnA(user.userId, question.id);
    this.db.list('/games/' + game.gameId + '/playerQnA').push(playerQnA);

  }

  addPlayerQnAToGame(game: Game, playerQnA: PlayerQnA) {
    this.db.list('/games/' + game.gameId + '/playerQnA').push(playerQnA)
        .then((ret) => {
          // success
        });
  }

  setGameOver(game: Game, user: User) {
    this.db.object('/games/' + game.gameId).update({gameOver: true})
        .then((ret) => {
          // success
          // remove game from user's active list and add to inactive list
          this.db.object('/users/' + user.userId + '/games/active/' + game.gameId).remove();
          this.db.object('/users/' + user.userId + '/games/inactive').update({[game.gameId]: 'true'});
        });
  }
}
