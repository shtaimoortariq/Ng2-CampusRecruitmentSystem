import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// ------------ Angular Material Libraries 
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdToolbarModule, MdRadioModule, MdChipsModule, MdCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

// ------------- Components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewPostComponent } from './view-post/view-post.component';


// ------------- Routing
import { AppRoutes } from './routes';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';

//--------------Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { CreatePostComponent } from './create-post/create-post.component';


import { UserProfileService } from './user-profile.service';
import { AuthGuard } from './authGuard';
import { UserService } from "./user.service";
import { ApplyForJobComponent } from './apply-for-job/apply-for-job.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileComponent,
    CreatePostComponent,
    ViewPostComponent,
    ApplyForJobComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdRadioModule,
    MdInputModule,
    MdToolbarModule,
    FlexLayoutModule,
    MdChipsModule,
    MdCardModule,
    AppRoutes,  
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, 
    AngularFireAuthModule

  ],

  providers: [UserService, UserProfileService, AuthGuard],

  bootstrap: [AppComponent]
})

export class AppModule { }