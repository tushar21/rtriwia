import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';

import {AppStore} from '../app-store';
import {Game, PlayerQnA, GameOptions, User, Question} from '../../../model';
import {GameActions} from '../actions';
import {GameService} from '../../services';
import { map, mergeMap, switchMap, filter, tap } from 'rxjs/operators'

@Injectable()
export class GameEffects {
    constructor (
        private actions$: Actions,
        private gameActions: GameActions,
        private svc: GameService
    ) {}

    @Effect()
    startNewGame$ = this.actions$.pipe(
        ofType(GameActions.CREATE_NEW_GAME),
        map((action: GameActions) => action.payload),
        switchMap((payload: {gameOptions: GameOptions, user: User}) => this.svc.createNewGame(payload.gameOptions, payload.user)),
        map((gameId: string) => this.gameActions.createNewGameSuccess(gameId))
    );

    @Effect() 
    loadGame$ = this.actions$
        .pipe(
            ofType(GameActions.LOAD_GAME)
            ,map((action: GameActions) => action.payload)
            ,switchMap((payload: {gameId: string, user: User}) => this.svc.getGame(payload.gameId, payload.user))
            ,map((game: Game) => this.gameActions.loadGameSuccess(game))
        );

    @Effect() 
    loadNextQuestion$ = this.actions$
    .pipe(
        ofType(GameActions.GET_NEXT_QUESTION)
        ,map((action: GameActions) => action.payload)
        ,switchMap((payload: {game: Game, user: User}) => this.svc.getNextQuestion(payload.game, payload.user))
        ,map((question: Question) => this.gameActions.getNextQuestionSuccess(question))
    );

    @Effect() 
    addPlayerQnA$ = this.actions$
    .pipe(
        ofType(GameActions.ADD_PLAYER_QNA)
        ,map((action: GameActions) => action.payload)
        ,tap((payload: {game: Game, playerQnA: PlayerQnA}) => this.svc.addPlayerQnAToGame(payload.game, payload.playerQnA))
        ,filter(() => false)
    );

    @Effect() 
    setGameOver$ = this.actions$
    .pipe(
        ofType(GameActions.SET_GAME_OVER)
    ,map((action: GameActions) => action.payload)
    ,tap((payload: {game: Game, user: User}) => {this.svc.setGameOver(payload.game, payload.user)})
    ,filter(() => false)
    ); 

    @Effect() 
    getActiveGames$ = this.actions$
    .pipe(
        ofType(GameActions.GET_ACTIVE_GAMES)
        , map((action: GameActions) => action.payload)
        , switchMap((payload: User) => this.svc.getActiveGames(payload))
        , map((games: string[]) => this.gameActions.getActiveGamesSuccess(games))
    );
}
