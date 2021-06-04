import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsMenuComponent } from './films-menu/films-menu.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmEditComponent } from './film-edit/film-edit.component';
import {MaterialModule} from "../../app/material.module";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FilmsMenuComponent, FilmsListComponent, FilmDetailComponent, FilmEditComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FilmsModule { }
