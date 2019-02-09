import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { AppStore } from '../app-store';
import { UserActions } from '../actions';
import { User } from '../../../model';
import { AuthenticationService } from '../../services'
import { map, switchMap } from 'rxjs/operators'

@Injectable()
export class UserEffects {
    constructor (
        private actions$: Actions,
        private userActions: UserActions,
        private svc: AuthenticationService
    ) {}

    @Effect() 
    loadUserRoles$ = this.actions$
    .pipe(
        ofType(UserActions.LOGIN_SUCCESS)
        ,map((action: UserActions) => action.payload)
        ,switchMap((user: User) => this.svc.getUserRoles(user))
        ,map((user: User) => this.userActions.addUserWithRoles(user))
    );
}
