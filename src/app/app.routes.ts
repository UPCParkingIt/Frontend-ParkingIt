import { Routes } from '@angular/router';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {HomeComponent} from './public/pages/home.component/home.component';
import {DriverHomeComponent} from './recognition/pages/driver-home.component/driver-home.component';

export const routes: Routes = [
  { path: "sign-up", component: SignUpComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "user/home", component: HomeComponent },
  { path: "driver/home", component: DriverHomeComponent },
  { path: "", redirectTo: "sign-up", pathMatch: "full" },
  { path: "**", redirectTo: "sign-up" }
];
