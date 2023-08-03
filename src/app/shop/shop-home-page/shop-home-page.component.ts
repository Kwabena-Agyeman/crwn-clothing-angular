import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-shop-home-page',
  templateUrl: './shop-home-page.component.html',
  styleUrls: ['./shop-home-page.component.scss'],
})
export class ShopHomePageComponent implements OnInit {
  constructor(
    public categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  navigateToCategory(title: string) {
    this.router.navigateByUrl(`/shop/${title}`);
  }
}
