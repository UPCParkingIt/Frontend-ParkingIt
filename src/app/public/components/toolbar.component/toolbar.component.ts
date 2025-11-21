import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {NgOptimizedImage} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-pi-toolbar',
  imports: [
    NgOptimizedImage,
    MatToolbar,
    MatMenuTrigger,
    MatIcon,
    MatMenu
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  isDropdownOpen = false;
  userName = 'Usuario Ejemplo';
  userEmail = 'usuario@ejemplo.com';

  constructor(private router: Router, private authService: AuthenticationService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.toolbar-user')) {
      this.isDropdownOpen = false;
    }
  }

  logout() {
    this.authService.signOut();
    console.log('Logging out...');
    this.isDropdownOpen = false;
    this.router.navigate(['/sign-in']);
  }
}
