import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import { User, GameOptions, Game, PlayerQnA, Question } from '../../../model';

@Injectable()
export class GameActions implements Action {

  type = '';
  constructor(public payload: Game) {}

  static RESET_NEW_GAME = 'RESET_NEW_GAME';
  resetNewGame(): any {
    return {
      type: GameActions.RESET_NEW_GAME,
      payload: ''
    };
  }

  static CREATE_NEW_GAME = 'CREATE_NEW_GAME';
  createNewGame(payload: {gameOptions: GameOptions, user: User}): any {
    return {
      type: GameActions.CREATE_NEW_GAME,
      payload: payload as {gameOptions: GameOptions, user: User}
    };
  }

  static CREATE_NEW_GAME_SUCCESS = 'CREATE_NEW_GAME_SUCCESS';
  createNewGameSuccess(gameId: string): any {
    return {
      type: GameActions.CREATE_NEW_GAME_SUCCESS,
      payload: gameId as string
    };
  }

  static LOAD_GAME = 'LOAD_GAME';
  loadGame(payload: {gameId: string, user: User}): any {
    return {
      type: GameActions.LOAD_GAME,
      payload: payload as {gameId: string, user: User}
    };
  }

  static LOAD_GAME_SUCCESS = 'LOAD_GAME_SUCCESS';
  loadGameSuccess(game: Game): any {
    return {
      type: GameActions.LOAD_GAME_SUCCESS,
      payload: game as Game
    };
  }

  static RESET_CURRENT_GAME = 'RESET_CURRENT_GAME';
  resetCurrentGame(): any {
    return {
      type: GameActions.RESET_CURRENT_GAME,
      payload: null
    };
  }

  static GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
  getNextQuestion(payload: {game: Game, user: User}): any {
    return {
      type: GameActions.GET_NEXT_QUESTION,
      payload: payload as {game: Game, user: User}
    };
  }

  static GET_NEXT_QUESTION_SUCCESS = 'GET_NEXT_QUESTION_SUCCESS';
  getNextQuestionSuccess(question: Question): any {
    return {
      type: GameActions.GET_NEXT_QUESTION_SUCCESS,
      payload: question as Question
    };
  }

  static ADD_PLAYER_QNA = 'ADD_PLAYER_QNA';
  addPlayerQnA(payload: {game: Game, playerQnA: PlayerQnA}): any {
    return {
      type: GameActions.ADD_PLAYER_QNA,
      payload: payload as {game: Game, playerQnA: PlayerQnA}
    };
  }

  static ADD_PLAYER_QNA_SUCCESS = 'ADD_PLAYER_QNA_SUCCESS';
  addPlayerQnASuccess(): any {
    return {
      type: GameActions.ADD_PLAYER_QNA_SUCCESS,
      payload: null
    };
  }

  static SET_GAME_OVER = 'SET_GAME_OVER';
  setGameOver(payload: {game: Game, user: User}): any {
    return {
      type: GameActions.SET_GAME_OVER,
      payload: payload as {game: Game, user: User}
    };
  }

  static RESET_CURRENT_QUESTION = 'RESET_CURRENT_QUESTION';
  resetCurrentQuestion(): any {
    return {
      type: GameActions.RESET_CURRENT_QUESTION,
      payload: null
    };
  }

  static GET_ACTIVE_GAMES = 'GET_ACTIVE_GAMES';
  getActiveGames(user: User): any {
    return {
      type: GameActions.GET_ACTIVE_GAMES,
      payload: user as User
    };
  }

  static GET_ACTIVE_GAMES_SUCCESS = 'GET_ACTIVE_GAMES_SUCCESS';
  getActiveGamesSuccess(games: string[]): any {
    return {
      type: GameActions.GET_ACTIVE_GAMES_SUCCESS,
      payload: games as string[]
    };
  }
}
