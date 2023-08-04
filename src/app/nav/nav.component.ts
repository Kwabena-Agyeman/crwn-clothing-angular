import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isCollapsed = true;

  constructor(
    public authService: AuthService,
    public cartService: CartService
  ) {}

  onSignOut() {
    this.authService.signOut();
  }
}
