import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DriverToolbarComponent} from '../../components/driver-toolbar.component/driver-toolbar.component';

@Component({
  selector: 'app-driver-home',
  imports: [
    DriverToolbarComponent
  ],
  templateUrl: './driver-home.component.html',
  styleUrl: './driver-home.component.css',
})
export class DriverHomeComponent {
  constructor(private router: Router) {}

  onStartClick(): void {
    const windowFeatures = 'width=800,height=600,toolbar=no,menubar=no,location=no';
    const newWindow = window.open(
      'http://172.20.10.3/control?var=face_enroll&val=1',
      '_blank',
      windowFeatures
    );

    // Cerrar la ventana después de 3 segundos (ajusta el tiempo según necesites)
    setTimeout(() => {
      if (newWindow && !newWindow.closed) {
        newWindow.close();
      }

      this.router.navigate(['/driver/menu']);
    }, 3000);
  }

  onExitClick(): void {
    this.router.navigate(['/driver/exit/menu']);
  }
}
