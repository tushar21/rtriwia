import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RoutingModule } from './routing/routing.module';
import { MyQuestionsModule } from './myQuestions/my-questions.module';
import { GamePlayModule } from './game-play/game-play.module';

import { AppComponent, DashboardComponent } from './components';
import { AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent, DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // rwa modules
    CoreModule,
    SharedModule,
    RoutingModule,
    MyQuestionsModule,
    GamePlayModule
  ],
  providers: [
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
