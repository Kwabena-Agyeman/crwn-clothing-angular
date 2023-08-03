import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ShopHomePageComponent } from './shop-home-page/shop-home-page.component';
import { ShopCategoryPageComponent } from './shop-category-page/shop-category-page.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

const redirectUnauthorizedToLogin = () => {
  const router = inject(Router);
  const toast = inject(ToastrService);

  const authService = inject(AuthService);
  return authService.user.pipe(
    map((user) => {
      if (user) return true;

      toast.warning('You must be logged in to access Shop page');
      router.navigate(['/auth']);
      return false;
    })
  );
};

const routes: Routes = [
  {
    path: 'shop',
    component: ShopHomePageComponent,
    canActivate: [redirectUnauthorizedToLogin],
  },
  {
    path: 'shop/:id',
    component: ShopCategoryPageComponent,
    canActivate: [redirectUnauthorizedToLogin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
