import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from './material.module';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RegisterComponent} from './register/register.component';
import {MatDialogModule} from "@angular/material/dialog";
import {UsersModule} from "../modules/users/users.module";
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {AuthState} from "../shared/auth.state";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavBarComponent,
    RegisterComponent,
  ],
  imports: [
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
      }
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth.token', 'auth.username']
    }),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    UsersModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
