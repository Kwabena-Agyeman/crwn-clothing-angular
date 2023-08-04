import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isLoading = false;
  registrationForm = new FormGroup(
    {
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    [this.passwordMismatch]
  );

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  private passwordMismatch(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    const isMatch = password === confirmPassword;

    if (!isMatch) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else return null;
  }

  onSubmit() {
    if (this.registrationForm.invalid) return;
    this.isLoading = true;

    const { email, password } = this.registrationForm.value;
    this.authService.signUp(email!, password!).subscribe(
      (response) => {
        this.toast.success('Registration successful');
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
