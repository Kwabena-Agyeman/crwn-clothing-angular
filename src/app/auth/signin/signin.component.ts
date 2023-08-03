import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;

    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email!, password!);
      this.toast.success('Registration successful');
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        this.toast.warning(error.code);
        return;
      }
      this.toast.error('Something went wrong');
    }
  }
}
