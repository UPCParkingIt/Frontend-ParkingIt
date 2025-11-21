import {Component, OnInit} from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar.component/toolbar.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatFormField} from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {UserService} from '../../../iam/services/user.service';

@Component({
  selector: 'app-home.component',
  imports: [
    ToolbarComponent,
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconModule,
    MatIconButton,
    MatCardHeader,
    MatCardTitle,
    MatOption,
    MatSelect,
    MatFormField,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatButton,
    MatInput
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userId: any;
  userFirstName = '';
  userLastName = '';
  userEmail = '';

  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.authService.currentUserId.subscribe(id => {
      this.userId = id;
      this.userService.getById(this.userId).subscribe(user => {
        this.userFirstName = user.firstName;
        this.userLastName = user.lastName;
        this.userEmail = user.email;
      });
    });
  }
}
