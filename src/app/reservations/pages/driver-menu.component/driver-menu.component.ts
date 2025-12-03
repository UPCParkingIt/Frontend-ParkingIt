import {Component, OnInit} from '@angular/core';
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
import {DriverInfoComponent} from '../../../vehicles/components/driver-info.component/driver-info.component';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-driver-menu',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    FormsModule,
    DriverToolbarComponent,
    DriverInfoComponent
  ],
  templateUrl: './driver-menu.component.html',
  styleUrl: './driver-menu.component.css',
})
export class DriverMenuComponent implements OnInit {
  reservationCode: string = '';
  userId: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private reservationService: ReservationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    //this.authenticationService.currentUserId.subscribe(id => {
    //  this.userId = id;
    //});
  }

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

    this.reservationService.getAll().subscribe({
      next: (reservations) => {
        const reservationArray = Array.isArray(reservations) ? reservations : [reservations];
        const validReservation = reservationArray.find((r) =>
          r.accessCode === this.reservationCode.trim()
        );

        if (validReservation) {
          this.showSuccessModal();
        } else {
          this.showErrorModal();
        }
      },
      error: (error) => {
        console.error('Error al obtener reservaciones:', error);
        this.showErrorModal();
      }
    });
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
