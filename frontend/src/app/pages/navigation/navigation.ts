import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class Navigation {
  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router) {
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}