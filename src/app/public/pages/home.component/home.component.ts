import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar.component/toolbar.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatFormField} from '@angular/material/form-field';
import {
  MatCalendarCellClassFunction,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {UserService} from '../../../iam/services/user.service';
import {BrowserModule} from '@angular/platform-browser';
import {ReservationService} from '../../../reservations/services/reservation.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home.component',
  imports: [
    ToolbarComponent,
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconModule,
    MatCardHeader,
    MatCardTitle,
    MatOption,
    MatSelect,
    MatFormField,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButton,
    MatInput,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
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
  ) {}

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

  loadOccupiedDates(): void {
    this.reservationService.getAll().subscribe(reservations => {
      if (Array.isArray(reservations)) {
        this.occupiedDates = reservations.map((r: any) => new Date(r.reservationDate));
      } else {
        this.occupiedDates = [new Date((reservations as any).reservationDate)];
      }
      console.log("FECHAS: ", this.occupiedDates);

      // Forzar detección de cambios
      this.cdr.detectChanges();

      // Log para verificar que las fechas se están comparando correctamente
      this.occupiedDates.forEach(d => console.log('Fecha ocupada:', this.formatDate(d)));
    });
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return true;
    const dateStr = this.formatDate(date);
    return !this.occupiedDates.some(d => this.formatDate(d) === dateStr);
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const dateStr = this.formatDate(cellDate);
      const isOccupied = this.occupiedDates.some(d => this.formatDate(d) === dateStr);
      return isOccupied ? 'occupied-date' : '';
    }
    return '';
  };

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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
