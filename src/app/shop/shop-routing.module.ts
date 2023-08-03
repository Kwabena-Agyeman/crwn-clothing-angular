import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopHomePageComponent } from './shop-home-page/shop-home-page.component';
import { ShopCategoryPageComponent } from './shop-category-page/shop-category-page.component';

const routes: Routes = [
  { path: 'shop', component: ShopHomePageComponent },
  { path: 'shop/:id', component: ShopCategoryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
