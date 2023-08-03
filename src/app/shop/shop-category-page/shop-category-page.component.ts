import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ICategory from 'src/app/models/category.interface';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-shop-category-page',
  templateUrl: './shop-category-page.component.html',
  styleUrls: ['./shop-category-page.component.scss'],
})
export class ShopCategoryPageComponent implements OnInit {
  category: string = '';
  items: ICategory[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService,
    private cartService: CartService
  ) {
    this.route.params.subscribe((params) => {
      const id: string = params['id'];
      if (!id) this.router.navigateByUrl('/');
      this.category = id;
    });
  }

  ngOnInit(): void {
    this.categoryService.categories.subscribe((categories) => {
      const category = categories.find(
        (el) => el.title.toLowerCase() === this.category.toLowerCase()
      );

      if (category) {
        this.items = category.items;
      }
    });
  }

  onAddToCart(item: ICategory) {
    const { id, imageUrl, name, price } = item;
    this.cartService.addToCart({ name, price, imageUrl, quantity: 1 });
  }
}
