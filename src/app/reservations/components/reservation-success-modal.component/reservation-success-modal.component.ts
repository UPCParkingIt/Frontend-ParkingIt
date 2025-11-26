import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'reservation-success-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="dialog-container">
      <div class="icon-success">✓</div>
      <h2>Su código es correcto</h2>
      <p>Pase adelante</p>
    </div>
  `,
  styles: [`
    .dialog-container {
      text-align: center;
      padding: 24px;
    }
    .icon-success {
      width: 60px;
      height: 60px;
      background-color: #62B5A5;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      margin: 0 auto 20px;
    }
    h2 {
      color: #333;
      margin-bottom: 12px;
    }
    p {
      color: #666;
      font-size: 16px;
    }
  `]
})
export class ReservationSuccessDialog {}
