import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmsMenuComponent} from "./films-menu/films-menu.component";
import {FilmEditComponent} from "./film-edit/film-edit.component";
import {FilmsListComponent} from "./films-list/films-list.component";
import {FilmDetailComponent} from "./film-detail/film-detail.component";

const routes: Routes = [
  {
    path: '',
    component: FilmsMenuComponent,
    children: [
      {
        path: 'edit/:id',
        component: FilmEditComponent
      }, {
        path: '',
        component: FilmsListComponent,
        children: [
          {
            path: ':id',
            component: FilmDetailComponent
          }]
      }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule {
}
