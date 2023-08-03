import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopHomePageComponent } from './shop-home-page/shop-home-page.component';
import { ShopCategoryPageComponent } from './shop-category-page/shop-category-page.component';


@NgModule({
  declarations: [
    ShopHomePageComponent,
    ShopCategoryPageComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
