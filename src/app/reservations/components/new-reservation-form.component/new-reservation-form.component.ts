import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {UserService} from '../../../iam/services/user.service';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-new-reservation-form',
    imports: [
        FormsModule,
        MatButton,
        MatCalendar,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatFormField,
        MatIcon,
        MatInput,
        MatOption,
        MatSelect
    ],
  templateUrl: './new-reservation-form.component.html',
  styleUrl: './new-reservation-form.component.css',
})
export class NewReservationFormComponent implements OnInit{
  userId: any;
  userFirstName = '';
  userLastName = '';
  userEmail = '';

  selectedLocation = '';
  selectedDate: Date | null = null;
  selectedTime = '07:00';
  durationHours = 0;
  occupiedDates: Date[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private reservationService: ReservationService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUserId.subscribe(id => {
      this.userId = id;
      if (this.userId) {
        this.userService.getById(this.userId).subscribe(user => {
          this.userFirstName = user.firstName;
          this.userLastName = user.lastName;
          this.userEmail = user.email;
        });
      }
    });
    this.loadOccupiedDates();
  }

  onDateChange(): void {
    this.cdr.detectChanges();
  }

  loadOccupiedDates(): void {
    this.reservationService.getAll().subscribe(reservations => {
      if (Array.isArray(reservations)) {
        this.occupiedDates = reservations.map((r: any) => {
          const date = new Date(r.reservationDate);
          date.setHours(0, 0, 0, 0);
          return date;
        });
      } else {
        const date = new Date((reservations as any).reservationDate);
        date.setHours(0, 0, 0, 0);
        this.occupiedDates = [date];
      }
      console.log("FECHAS OCUPADAS: ", this.occupiedDates);

      // Forzar la actualización del calendario
      if (this.selectedDate) {
        const tempDate = this.selectedDate;
        this.selectedDate = null;
        setTimeout(() => {
          this.selectedDate = tempDate;
          this.cdr.detectChanges();
        });
      } else {
        this.cdr.detectChanges();
      }
    });
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return true;
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    return !this.occupiedDates.some(d => {
      const occupiedDate = new Date(d);
      occupiedDate.setHours(0, 0, 0, 0);
      return occupiedDate.getTime() === normalizedDate.getTime();
    });
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const normalizedCellDate = new Date(cellDate);
      normalizedCellDate.setHours(0, 0, 0, 0);

      const isOccupied = this.occupiedDates.some(d => {
        const occupiedDate = new Date(d);
        occupiedDate.setHours(0, 0, 0, 0);
        return occupiedDate.getTime() === normalizedCellDate.getTime();
      });
      return isOccupied ? 'occupied-date' : '';
    }
    return '';
  };

  createReservation(): void {
    if (!this.selectedLocation || !this.selectedDate || !this.selectedTime || !this.durationHours) {
      alert('Por favor completa todos los campos');
      return;
    }

    const reservationDateTime = this.combineDateAndTime(this.selectedDate, this.selectedTime);


    const reservation = {
      reservationDate: reservationDateTime,
      userId: this.userId,
      location: this.selectedLocation,
      hours: this.durationHours
    };

    this.reservationService.create(reservation).subscribe({
      next: () => {
        alert('Reservación creada exitosamente');
        this.loadOccupiedDates(); // Recargar fechas ocupadas
        // Limpiar formulario
        this.selectedLocation = '';
        this.selectedDate = null;
        this.selectedTime = '07:00';
        this.durationHours = 1;
      },
      error: (err) => {
        console.error('Error creando reservación:', err);
        alert('Error al crear la reservación');
      }
    });
  }

  private combineDateAndTime(date: Date, time: string): string {
    const [hours, minutes] = time.split(':');
    const dateTime = new Date(date);
    dateTime.setHours(parseInt(hours, 10));
    dateTime.setMinutes(parseInt(minutes, 10));
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    return dateTime.toISOString();
  }
}
