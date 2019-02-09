import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/index';
import { AuthGuard } from '../core/services';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'my-questions',
    loadChildren: '../myQuestions/my-questions.module#MyQuestionsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'game-play',
    loadChildren: '../game-play/game-play.module#GamePlayModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: '../admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  }
];
