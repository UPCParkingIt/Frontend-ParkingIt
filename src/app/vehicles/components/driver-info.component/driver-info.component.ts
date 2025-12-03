import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {VehicleEntity} from '../../model/vehicle.entity';
import {interval, Subscription, switchMap} from 'rxjs';
import {VehicleService} from '../../services/vehicle.service';
import {RecognitionProcessService} from '../../../recognition/services/recognition-process.service';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-driver-info',
  imports: [
    MatIcon,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './driver-info.component.html',
  styleUrl: './driver-info.component.css',
})
export class DriverInfoComponent implements OnInit, OnDestroy {
  vehicle: VehicleEntity | null = null;
  isVerified: boolean = false;
  isLoading: boolean = true;
  private statusSubscription?: Subscription;

  @Output() verificationStatusChange = new EventEmitter<boolean>();

  constructor(
    private vehicleService: VehicleService,
    private recognitionService: RecognitionProcessService
  ) {}

  ngOnInit(): void {
    this.loadVehicleData();
    this.startStatusCheck();
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  private loadVehicleData(): void {
    this.vehicleService.getLastVehicle().subscribe({
      next: (vehicle) => {
        this.vehicle = vehicle;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar vehículo:', error);
        this.isLoading = false;
      }
    });
  }

  private startStatusCheck(): void {
    this.statusSubscription = interval(2000)
      .pipe(
        switchMap(() => this.recognitionService.getProcessStatus())
      )
      .subscribe({
        next: (status) => {
          this.isVerified = status;
          this.verificationStatusChange.emit(this.isVerified);
        },
        error: (error) => {
          console.error('Error al verificar estado:', error);
          this.isVerified = false;
          this.verificationStatusChange.emit(false);
        }
      });
  }
}
