import { Routes } from '@angular/router';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {HomeComponent} from './public/pages/home.component/home.component';

export const routes: Routes = [
  { path: "sign-up", component: SignUpComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "sign-up", pathMatch: "full" },
  { path: "**", redirectTo: "sign-up" }
];
