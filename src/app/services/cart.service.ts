import { Injectable } from '@angular/core';
import ICartItem from '../models/cart-item.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSource = new BehaviorSubject<ICartItem[]>([]);
  cart = this.cartSource.asObservable();

  constructor() {}

  addToCart(item: ICartItem) {
    const currentCartItems = this.cartSource.getValue();
    const existingItemIndex = currentCartItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItemIndex !== -1) {
      // Item with the same name already exists, increase the quantity
      currentCartItems[existingItemIndex].quantity += item.quantity;
    } else {
      // Item with the same name doesn't exist, add a new object
      currentCartItems.push(item);
    }

    this.cartSource.next(currentCartItems);
  }

  removeFromCart(itemName: string) {
    const currentCartItems = this.cartSource.getValue();
    const existingItemIndex = currentCartItems.findIndex(
      (cartItem) => cartItem.name === itemName
    );

    if (existingItemIndex !== -1) {
      currentCartItems.splice(existingItemIndex, 1);
      this.cartSource.next(currentCartItems);
    }
  }
}
