import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {take, map} from 'rxjs/operators';

import { AppStore } from '../store/app-store';
import { LoginComponent } from '../components';
import { UserActions, UIStateActions } from '../store/actions';
import { User } from '../../model';

@Injectable()
export class AuthenticationService {
  dialogRef: MatDialogRef<LoginComponent>;

  constructor(private store: Store<AppStore>,
              private userActions: UserActions,
              private uiStateActions: UIStateActions,
              public afAuth: AngularFireAuth,
              public db: AngularFireDatabase,
              public dialog: MatDialog) {


  this.afAuth.authState.subscribe(afUser => {
      if ( afUser ) {
        // user logged in
        //console.log(afUser);
        let user = new User(afUser);
        afUser.getIdToken(false).then((token) => {
          //console.log(token);
          user.idToken = token;
          this.store.dispatch(this.userActions.loginSuccess(user));
        });
        if (this.dialogRef)
          this.dialogRef.close();
      }
      else {
        // user not logged in
        this.store.dispatch(this.userActions.logoff());
      }
    });
  }


  getUserRoles(user: User): Observable<User> {
    return this.db.object('/users/' + user.userId + "/roles").
            valueChanges()
           .pipe(take(1))
           .pipe(map(roles => {
             user.roles = roles;
             return user;
            }));
  }

  ensureLogin = function(url?: string) {
    if (!this.isAuthenticated)
      this.showLogin(url);
  };

  showLogin = function(url?: string) {
    this.store.dispatch(this.uiStateActions.setLoginRedirectUrl(url));
    this.dialogRef = this.dialog.open(LoginComponent, {
      disableClose: false
    });
  };

  logout = function() {
    this.afAuth.auth.signOut();
  };

  get isAuthenticated (): boolean {
    let user: User;
    this.store.pipe(take(1)).subscribe(s => user = s.user)
    if (user)
      return true;

    return false;
  };

  get user () : User {
    let user: User;
    this.store.pipe(take(1)).subscribe(s => user = s.user)
    return user;
  };

}
