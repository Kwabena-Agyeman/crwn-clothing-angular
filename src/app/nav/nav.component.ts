import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isCollapsed = true;

  constructor(public authService: AuthService) {}

  async onSignOut() {
    await this.authService.signOut();
  }
}
