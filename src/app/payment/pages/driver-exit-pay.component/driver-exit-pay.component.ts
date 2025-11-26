import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {
  DriverToolbarComponent
} from '../../../recognition/components/driver-toolbar.component/driver-toolbar.component';

@Component({
  selector: 'app-driver-exit-pay.component',
  imports: [
    DriverToolbarComponent
  ],
  templateUrl: './driver-exit-pay.component.html',
  styleUrl: './driver-exit-pay.component.css',
})
export class DriverExitPayComponent {
  totalAmount: number = 25.00;

  constructor(private router: Router) {}

  onApplePayClick(): void {
    this.router.navigate(['/thanks']);
  }

  onGooglePayClick(): void {
    this.router.navigate(['/thanks']);
  }
}
