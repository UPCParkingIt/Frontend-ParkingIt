import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar.component/toolbar.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatFormField} from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-home.component',
  imports: [
    ToolbarComponent,
    MatCard,
    MatCardContent,
    MatIcon,
    MatCardHeader,
    MatCardTitle,
    MatOption,
    MatSelect,
    MatFormField,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
