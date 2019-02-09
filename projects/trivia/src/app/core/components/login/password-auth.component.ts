import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'login',
  templateUrl: './password-auth.component.html',
  styleUrls: ['./password-auth.component.scss']
})
export class PasswordAuthComponent implements OnInit {

  mode: SignInMode;

  signupForm: FormGroup;
  signinForm: FormGroup;
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              public dialogRef: MatDialogRef<PasswordAuthComponent>) {
    this.mode = SignInMode.signIn;
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }
    );

    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: signupFormValidator}
    );

    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
      }
    );
  }


  //signin
  onSigninSubmit() {
    this.afAuth.auth.signInWithEmailAndPassword(
      this.signinForm.get('email').value,
      this.signinForm.get('password').value
    ).then((user: any) => {
      //success
      this.dialogRef.close();
    }, (error: Error) => {
      //error
      console.log(error);
    });
    
  }

  //register
  onSignupSubmit() {
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.signupForm.get('email').value,
      this.signupForm.get('password').value
    ).then((user: any) => {
      //success
      this.dialogRef.close();
    }, (error: Error) => {
      //error
      console.log(error);
    });
  }

  //forgot password
  onForgotPasswordSubmit() {
    firebase.auth().sendPasswordResetEmail(this.forgotPasswordForm.get('email').value)
    .then((a: any) => {
      console.log(a);
    },
    (error: Error) => {
      console.log(error);
    });
  }
}

export enum SignInMode {
  signIn,
  signUp,
  forgotPassword
}

function signupFormValidator(fg: FormGroup): {[key: string]: boolean} {
  //TODO: check if email is already taken

  //Password match validation
  if (fg.get('password').value !== fg.get('confirmPassword').value)
    return {'passwordmismatch': true}

  return null;
}
