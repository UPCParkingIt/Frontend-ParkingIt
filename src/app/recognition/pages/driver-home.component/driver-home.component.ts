import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DriverToolbarComponent} from '../../components/driver-toolbar.component/driver-toolbar.component';

@Component({
  selector: 'app-driver-home',
  imports: [
    DriverToolbarComponent
  ],
  templateUrl: './driver-home.component.html',
  styleUrl: './driver-home.component.css',
})
export class DriverHomeComponent {
  constructor(private router: Router) {}

  onStartClick(): void {
    this.router.navigate(['/driver/recognition']);
  }
}
