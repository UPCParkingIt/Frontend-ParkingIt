import {Component, OnInit} from '@angular/core';
import {
  DriverToolbarComponent
} from '../../../recognition/components/driver-toolbar.component/driver-toolbar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-driver-exit-menu.component',
  imports: [
    DriverToolbarComponent
  ],
  templateUrl: './driver-exit-menu.component.html',
  styleUrl: './driver-exit-menu.component.css',
})
export class DriverExitMenuComponent implements OnInit {
  vehicleCode: string = 'ABC-123';
  entryTime: string = '08:30 AM';
  currentTime: string = '02:45 PM';
  totalHours: number = 6.25;
  totalAmount: number = 25.00;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí puedes calcular el tiempo actual si lo deseas
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onPayClick(): void {
    this.router.navigate(['/driver/exit/pay']);
  }
}
