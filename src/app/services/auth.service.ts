import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  user,
  signOut,
  fetchSignInMethodsForEmail,
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  addDoc,
  collection,
  DocumentData,
  getDocs,
  getDoc,
  setDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import IUser from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User | null>;

  constructor(private auth: Auth, private db: Firestore) {
    this.user = user(this.auth);
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
}
