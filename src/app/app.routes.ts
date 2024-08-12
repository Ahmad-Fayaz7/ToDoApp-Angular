import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouteGuardService } from './route-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  },
];
