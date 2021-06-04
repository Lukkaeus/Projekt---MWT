import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ExtendedUsersComponent} from "./extended-users/extended-users.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {EditUserChildComponent} from "./edit-user-child/edit-user-child.component";
import {MaterialModule} from "../../app/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {GroupsToStringPipe} from "../../pipes/groups-to-string.pipe";
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ExtendedUsersComponent,
    UsersListComponent,
    EditUserComponent,
    EditUserChildComponent,
    GroupsToStringPipe,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class UsersModule {
}
