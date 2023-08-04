import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs';

const redirectUnauthorizedToLogin = () => {
  const router = inject(Router);
  const toast = inject(ToastrService);

  const authService = inject(AuthService);
  return authService.user.pipe(
    map((user) => {
      if (user) return true;

      toast.warning('You must be logged in to view checkout');
      router.navigate(['/auth']);
      return false;
    })
  );
};

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'about', component: ContactComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [redirectUnauthorizedToLogin],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
