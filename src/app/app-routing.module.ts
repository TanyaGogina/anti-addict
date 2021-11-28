import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'content',
    pathMatch: 'full'
  },
  {
    path: '_folder/:id',
    loadChildren: () => import('./_folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'achievement',
    loadChildren: () => import('./modules/achievement/achievement.module').then(m => m.AchievementModule)
  },
  {
    path: 'content',
    loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule)
  },
  {
    path: 'failure',
    loadChildren: () => import('./modules/failure/failure.module').then(m => m.FailureModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./modules/finance/finance.module').then(m => m.FinanceModule)
  },
  {
    path: 'poll',
    loadChildren: () => import('./modules/poll/poll.module').then(m => m.PollModule)
  },
  {
    path: 'reminder',
    loadChildren: () => import('./modules/reminder/reminder.module').then(m => m.ReminderModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./modules/statistic/statistic.module').then(m => m.StatisticModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
