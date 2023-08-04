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
  isLoading = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe(
      (response) => {
        this.toast.success('Login successful');
        this.router.navigateByUrl('/');
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.toast.warning(error);
        this.isLoading = false;
      }
    );
  }
}
