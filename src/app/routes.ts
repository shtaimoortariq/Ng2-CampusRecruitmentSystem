import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import {ApplyForJobComponent} from './apply-for-job/apply-for-job.component'
import {AuthGuard} from './authGuard'
const routing: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent },
    { path: 'createpost', component: CreatePostComponent },
    { path: 'viewpost', component: ViewPostComponent },
    { path: 'applyForJob', component: ViewPostComponent },
    { path: '**', redirectTo: '' }

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routing);
export default AppRoutes;