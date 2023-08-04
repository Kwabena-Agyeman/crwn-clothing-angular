import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  user,
  signOut,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import IUser from '../models/user.interface';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSource = new BehaviorSubject<User | null>(null);
  user = this.userSource.asObservable();

  constructor(
    private auth: Auth,
    private db: Firestore,
    private router: Router,
    private cartService: CartService
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userSource.next(user);
        this.cartService.fetchCartFromLocalStorage(user.uid);
      } else {
        this.userSource.next(null);
      }
    });
  }

  get currentUser() {
    return this.auth.currentUser?.uid;
  }

  async createUser(userData: IUser) {
    const { email, displayName, password } = userData;

    if (!password) throw new Error('Please provide a password');

    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const user_uid = userCredential.user.uid;

    if (this.auth.currentUser) {
      await updateProfile(this.auth.currentUser, { displayName });
    }

    const docRef = doc(
      this.db,
      `users/${user_uid}`
    ) as DocumentReference<IUser>;

    await setDoc(docRef, {
      displayName,
      email,
    });
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  async signOut() {
    await signOut(this.auth);
    await this.router.navigateByUrl('/auth');
  }
}
