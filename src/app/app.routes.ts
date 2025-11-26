import { Routes } from '@angular/router';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {HomeComponent} from './public/pages/home.component/home.component';
import {DriverHomeComponent} from './recognition/pages/driver-home.component/driver-home.component';
import {DriverMenuComponent} from './reservations/pages/driver-menu.component/driver-menu.component';
import {ThanksComponent} from './reservations/pages/thanks.component/thanks.component';
import {DriverExitMenuComponent} from './payment/pages/driver-exit-menu.component/driver-exit-menu.component';
import {DriverExitPayComponent} from './payment/pages/driver-exit-pay.component/driver-exit-pay.component';

export const routes: Routes = [
  { path: "sign-up", component: SignUpComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "user/home", component: HomeComponent },
  { path: "driver/home", component: DriverHomeComponent },
  { path: "driver/menu", component: DriverMenuComponent },
  { path: "driver/exit/menu", component: DriverExitMenuComponent },
  { path: "driver/exit/pay", component: DriverExitPayComponent },
  { path: "thanks", component: ThanksComponent },
  { path: "", redirectTo: "sign-up", pathMatch: "full" },
  { path: "**", redirectTo: "sign-up" }
];
