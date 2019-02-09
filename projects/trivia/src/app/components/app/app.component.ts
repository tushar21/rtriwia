import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { AppStore } from '../../core/store/app-store';
import { CategoryActions, TagActions, QuestionActions, GameActions } from '../../core/store/actions';
import { AuthenticationService, Utils } from '../../core/services';
import { User } from '../../model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'trivia!';
  user: User;
  sub: Subscription;
  sub2: Subscription;

  constructor(
              private authService: AuthenticationService,
              private categoryActions: CategoryActions,
              private tagActions: TagActions,
              private questionActions: QuestionActions,
              private gameActions: GameActions,
              private store: Store<AppStore>,
              private router: Router,
              public snackBar: MatSnackBar) {
    this.sub = store.select(s => s.questionSaveStatus).subscribe((status) => {
      if (status === "SUCCESS")
        this.snackBar.open("Question saved!", "", {duration: 2000});
      if (status === "IN PROGRESS")
        this.router.navigate(['/my-questions']);
    })

    this.sub2 = store.select(s => s.user).subscribe(user => {
      this.user = user
      if (user)
      {
        console.log(user);
        //Load active Games
        this.store.dispatch(this.gameActions.getActiveGames(user));
        let url: string;
        this.store.pipe(take(1)).subscribe(s => url = s.loginRedirectUrl);
        if (url)
          this.router.navigate([url]);
      }
      else {
        //if user logsout then redirect to home page
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit () {
    this.store.dispatch(this.categoryActions.loadCategories());
    this.store.dispatch(this.tagActions.loadTags());
    this.store.dispatch(this.questionActions.loadQuestions());
  }

  ngOnDestroy() {
    Utils.unsubscribe([this.sub, this.sub2]);
  }

  login() {
    this.authService.ensureLogin();
  }

  logout() {
    this.authService.logout();
  }
}
