import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.authService.autoLogin();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.cartService.fetchCartFromLocalStorage(user.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
