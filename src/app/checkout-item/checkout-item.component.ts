import { Component, Input } from '@angular/core';
import ICartItem from '../models/cart-item.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss'],
})
export class CheckoutItemComponent {
  constructor(public cartService: CartService) {}

  @Input() checkOutItem!: ICartItem;
}
