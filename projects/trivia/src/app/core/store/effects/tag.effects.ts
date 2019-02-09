import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { AppStore } from '../app-store';
import { TagActions } from '../actions';
import { TagService } from '../../services'
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class TagEffects {
    constructor (
        private actions$: Actions,
        private tagActions: TagActions,
        private svc: TagService
    ) {}

    @Effect() 
    loadTags$ = this.actions$
    .pipe(
        ofType(TagActions.LOAD_TAGS)
        ,switchMap(() => this.svc.getTags())
        ,map((tags: string[]) => this.tagActions.loadTagsSuccess(tags))
    )

}
