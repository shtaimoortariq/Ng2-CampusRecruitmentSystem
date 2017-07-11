
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// ------------ Angular Material Libraries 
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';


// ------------- Components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// ------------- Routing
import { AppRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdToolbarModule,
    FlexLayoutModule,
    AppRoutes
  ],

  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
