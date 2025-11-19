import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignUpComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend-ParkingIt');
}
