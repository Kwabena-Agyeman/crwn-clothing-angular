import { Injectable } from '@angular/core';
import ICartItem from '../models/cart-item.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSource = new BehaviorSubject<ICartItem[]>([]);
  private totalSource = new BehaviorSubject<number>(0);
  cart = this.cartSource.asObservable();
  cartTotal = this.totalSource.asObservable();
  userToken = '';

  constructor() {}

  fetchCartFromLocalStorage(token: string) {
    this.userToken = token;
    const cart_token = `crwn-clothing-cart-${this.userToken}`;
    const storedCart = localStorage.getItem(cart_token);
    if (storedCart) {
      this.cartSource.next(JSON.parse(storedCart));
      this.updateTotal();
    } else {
      this.cartSource.next([]);
    }
  }

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
    this.updateTotal();
    this.saveCartToLocalStorage(currentCartItems);
  }

  removeFromCart(itemName: string) {
    const currentCartItems = this.cartSource.getValue();
    const existingItemIndex = currentCartItems.findIndex(
      (cartItem) => cartItem.name === itemName
    );

    if (existingItemIndex !== -1) {
      currentCartItems.splice(existingItemIndex, 1);

      this.cartSource.next(currentCartItems);
      this.updateTotal();
      this.saveCartToLocalStorage(currentCartItems);
    }
  }

  increaseQuantity(itemName: string) {
    const currentCartItems = this.cartSource.getValue();
    const itemToUpdate = currentCartItems.find(
      (cartItem) => cartItem.name === itemName
    );

    if (itemToUpdate) {
      itemToUpdate.quantity += 1;
      this.cartSource.next(currentCartItems);
      this.updateTotal();
      this.saveCartToLocalStorage(currentCartItems);
    }
  }

  decreaseQuantity(itemName: string) {
    const currentCartItems = this.cartSource.getValue();
    const itemToUpdate = currentCartItems.find(
      (cartItem) => cartItem.name === itemName
    );

    if (itemToUpdate) {
      if (itemToUpdate.quantity === 1) {
        // If the quantity is 1, remove the item from the cart
        this.removeFromCart(itemName);
      } else {
        itemToUpdate.quantity -= 1;
        this.cartSource.next(currentCartItems);
        this.updateTotal();
        this.saveCartToLocalStorage(currentCartItems);
      }
    }
  }

  private updateTotal() {
    const currentCartItems = this.cartSource.getValue();
    const updatedTotal = this.calculateTotal(currentCartItems);
    this.totalSource.next(updatedTotal);
  }

  private calculateTotal(cartItems: ICartItem[]): number {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
  private saveCartToLocalStorage(cartItems: ICartItem[]) {
    localStorage.setItem(
      `crwn-clothing-cart-${this.userToken}`,
      JSON.stringify(cartItems)
    );
  }
}
