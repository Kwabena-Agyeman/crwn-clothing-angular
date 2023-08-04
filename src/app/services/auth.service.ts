import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import IUser from '../models/user.interface';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface LoginResponseData extends AuthResponseData {
  registered: boolean;
}

export type AuthResponse = AuthResponseData | LoginResponseData;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`;

  private loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`;

  userSource = new BehaviorSubject<IUser | null>(null);
  user = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          this.userCreation(res);
        }),
        catchError((errorRes) => {
          return this.handleError(errorRes);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponseData>(this.loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          this.userCreation(res);
        }),
        catchError((errorRes) => {
          return this.handleError(errorRes);
        })
      );
  }

  signOut() {
    this.userSource.next(null);
    localStorage.removeItem('crwn-clothing-token');
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData = localStorage.getItem('crwn-clothing-token');
    if (!userData) return;

    const user: IUser = JSON.parse(userData);
    const isTokenValid = new Date() < new Date(user.tokenExpirationDate);

    if (isTokenValid) {
      this.userSource.next(user);
    } else {
      localStorage.removeItem('crwn-clothing-token');
    }
  }

  private userCreation(data: AuthResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user: IUser = {
      email: data.email,
      id: data.localId,
      token: data.idToken,
      tokenExpirationDate: expirationDate,
    };

    this.userSource.next(user);
    localStorage.setItem('crwn-clothing-token', JSON.stringify(user));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (err?.error?.error?.message) {
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid';
          break;
        default:
          'Something went wrong, please try again';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
