import { NgModule } from '@angular/core';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { Routes, RouterModule } from '@angular/router';
import { LoggedUserGuard } from './core/guards/logged-user-guard';
import { UnLoggedUserGuard } from './core/guards/unlogged-user-guard';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LoginComponent } from './features/auth/components/intro/login/login.component';


const routes: Routes = [
  { 
    path: '',      //, component: LoginComponent 
    loadChildren: () =>
      import('./features/auth/auth.module').then((mod) => mod.AuthModule),
    // canActivate: [UnLoggedUserGuard]
  },
  {
    path: 'entry',
    loadChildren: () =>
      import('./features/entry/entry.module').then((mod) => mod.EntryModule),
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: QuicklinkStrategy,
      enableTracing: false,
      initialNavigation: 'enabledBlocking',
    }),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule {}
