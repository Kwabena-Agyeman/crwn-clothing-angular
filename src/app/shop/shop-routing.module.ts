import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopHomePageComponent } from './shop-home-page/shop-home-page.component';

const routes: Routes = [{ path: 'shop', component: ShopHomePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
