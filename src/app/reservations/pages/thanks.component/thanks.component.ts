import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-thanks.component',
  imports: [],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.css',
})
export class ThanksComponent implements OnInit, OnDestroy {
  private timeoutId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => {
      this.router.navigate(['/driver/home']);
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
