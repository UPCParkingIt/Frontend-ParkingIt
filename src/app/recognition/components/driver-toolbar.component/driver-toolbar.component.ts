import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-driver-toolbar',
  imports: [
    MatToolbar,
    NgOptimizedImage
  ],
  templateUrl: './driver-toolbar.component.html',
  styleUrl: './driver-toolbar.component.css',
})
export class DriverToolbarComponent {

}
