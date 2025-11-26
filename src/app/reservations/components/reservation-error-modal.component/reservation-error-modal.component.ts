import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'reservation-error-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="dialog-container">
      <div class="icon-error">✗</div>
      <h2>Código incorrecto</h2>
      <p>El código no es correcto, por favor ingrese nuevamente</p>
    </div>
  `,
  styles: [`
    .dialog-container {
      text-align: center;
      padding: 24px;
    }
    .icon-error {
      width: 60px;
      height: 60px;
      background-color: #f44336;
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
      font-size: 14px;
    }
  `]
})
export class ReservationErrorDialog {}
