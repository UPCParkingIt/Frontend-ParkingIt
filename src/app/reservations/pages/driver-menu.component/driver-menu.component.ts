import { Component } from '@angular/core';
import {MatLabel} from '@angular/material/form-field';
import {MatFormField} from '@angular/material/form-field';
import {Router} from '@angular/router';
import {
  DriverToolbarComponent
} from '../../../recognition/components/driver-toolbar.component/driver-toolbar.component';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ReservationService} from '../../services/reservation.service';
import {
  ReservationSuccessDialog
} from '../../components/reservation-success-modal.component/reservation-success-modal.component';
import {
  ReservationErrorDialog
} from '../../components/reservation-error-modal.component/reservation-error-modal.component';

@Component({
  selector: 'app-driver-menu',
  imports: [
    MatLabel,
    MatFormField,
    FormsModule,
    DriverToolbarComponent
  ],
  templateUrl: './driver-menu.component.html',
  styleUrl: './driver-menu.component.css',
})
export class DriverMenuComponent {
  reservationCode: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private reservationService: ReservationService
  ) {}

  /*onReservationCodeSubmit(): void {
    if (!this.reservationCode.trim()) {
      return;
    }

    this.reservationService.getAll().subscribe({
      next: (reservations) => {
        const reservationArray = Array.isArray(reservations) ? reservations : [reservations];
        const codeExists = reservationArray.some((r: any) => r.id?.toString() === this.reservationCode);

        if (codeExists) {
          this.showSuccessModal();
        } else {
          this.showErrorModal();
        }
      },
      error: () => {
        this.showErrorModal();
      }
    });
  }*/

  onReservationCodeSubmit(): void {
    if (!this.reservationCode.trim()) {
      return;
    }

    if (this.reservationCode === 'ABCDE') {
      this.showSuccessModal();
    } else {
      this.showErrorModal();
    }
  }

  private showSuccessModal(): void {
    const dialogRef = this.dialog.open(ReservationSuccessDialog, {
      width: '400px',
      disableClose: true
    });

    setTimeout(() => {
      dialogRef.close();
      this.router.navigate(['/thanks']);
    }, 5000);
  }

  private showErrorModal(): void {
    const dialogRef = this.dialog.open(ReservationErrorDialog, {
      width: '400px',
      disableClose: true
    });

    setTimeout(() => {
      dialogRef.close();
      this.reservationCode = '';
      this.router.navigate(['/driver/menu']);
    }, 3000);
  }

  onManualEntry(): void {
    this.router.navigate(['/thanks']);
  }
}
