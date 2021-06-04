import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "../guards/auth.guard";
import {SelectingPreloadingStrategyService} from "../guards/selecting-preloading-strategy.service";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'users',
    loadChildren: () =>
      import('../modules/users/users.module').then(mod => mod.UsersModule),
    canLoad: [AuthGuard],
    data: {preloading: true}
  },
  {
    path: 'films',
    loadChildren: () =>
      import('../modules/films/films.module').then(mod => mod.FilmsModule),
    // canLoad: [AuthGuard],
    data: {preloading: false}
  },
  {path: '', redirectTo: '/users/simple', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: SelectingPreloadingStrategyService})
  ], exports: [RouterModule]
})
export class AppRoutingModule {
}
