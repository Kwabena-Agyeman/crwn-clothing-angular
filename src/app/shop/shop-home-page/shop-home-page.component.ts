import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ICartItem from 'src/app/models/cart-item.interface';
import ICategory from 'src/app/models/category.interface';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-shop-home-page',
  templateUrl: './shop-home-page.component.html',
  styleUrls: ['./shop-home-page.component.scss'],
})
export class ShopHomePageComponent implements OnInit {
  constructor(
    public categoryService: CategoriesService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  navigateToCategory(title: string) {
    this.router.navigateByUrl(`/shop/${title}`);
  }

  onAddToCart(item: ICategory) {
    const { id, imageUrl, name, price } = item;

    this.cartService.addToCart({ name, price, imageUrl, quantity: 1 });
  }
}
