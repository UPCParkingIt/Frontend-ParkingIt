import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  DriverToolbarComponent
} from '../../../recognition/components/driver-toolbar.component/driver-toolbar.component';
import {Router} from '@angular/router';
import {DriverInfoComponent} from '../../../vehicles/components/driver-info.component/driver-info.component';
import {NotificationService} from '../../../notifications/services/notification.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-driver-exit-menu.component',
  imports: [
    DriverToolbarComponent,
    DriverInfoComponent
  ],
  templateUrl: './driver-exit-menu.component.html',
  styleUrl: './driver-exit-menu.component.css',
})
export class DriverExitMenuComponent implements OnInit, OnDestroy {
  vehicleCode: string = 'ABC-123';
  entryTime: string = '08:30 AM';
  currentTime: string = '02:45 PM';
  totalHours: number = 6.25;
  totalAmount: number = 25.00;

  isIdentityVerified: boolean = false;
  verificationTimeout: any;
  userId: string = '';

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    });

    this.startVerificationTimeout();
  }

  ngOnDestroy(): void {
    if (this.verificationTimeout) {
      clearTimeout(this.verificationTimeout);
    }
  }

  private startVerificationTimeout(): void {
    this.verificationTimeout = setTimeout(() => {
      if (!this.isIdentityVerified) {
        this.isIdentityVerified = false;
        this.createMaliciousActivityNotification();
      }
    }, 30000); // 30 segundos
  }

  private createMaliciousActivityNotification(): void {
    const notification = {
      userId: this.userId,
      message: `Movimiento malicioso detectado en el vehículo ${this.vehicleCode}`,
      type: 'SECURITY_ALERT',
      timestamp: new Date(),
      vehicleCode: this.vehicleCode
    };

    this.notificationService.create(notification).subscribe({
      next: (response) => {
        console.log('Notificación de seguridad creada:', response);
      },
      error: (error) => {
        console.error('Error al crear notificación:', error);
      }
    });
  }

  onPayClick(): void {
    this.router.navigate(['/driver/exit/pay']);
  }

  onVerificationChange(isVerified: boolean): void {
    this.isIdentityVerified = isVerified;

    if (isVerified && this.verificationTimeout) {
      clearTimeout(this.verificationTimeout);
    }
  }
}
