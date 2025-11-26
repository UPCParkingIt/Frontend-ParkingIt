import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ToolbarComponent} from '../../components/toolbar.component/toolbar.component';
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
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {UserService} from '../../../iam/services/user.service';
import {ReservationService} from '../../../reservations/services/reservation.service';
import {FormsModule} from '@angular/forms';
import {
  NewReservationFormComponent
} from '../../../reservations/components/new-reservation-form.component/new-reservation-form.component';

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  imports: [
    ToolbarComponent,
    MatCard,
    MatCardContent,
    MatIconModule,
    MatCardHeader,
    MatCardTitle,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NewReservationFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userId: any;
  userFirstName = '';
  userLastName = '';
  userEmail = '';

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
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
