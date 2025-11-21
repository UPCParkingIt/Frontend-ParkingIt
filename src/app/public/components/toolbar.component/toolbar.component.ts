import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {NgOptimizedImage} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {UserService} from '../../../iam/services/user.service';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-pi-toolbar',
  imports: [
    NgOptimizedImage,
    MatToolbar,
    MatMenuTrigger,
    MatIcon,
    MatIconModule,
    MatMenu,
    MatIconButton,
    MatMenuItem
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements OnInit {
  isDropdownOpen = false;
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
