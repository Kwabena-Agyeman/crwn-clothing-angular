import { Injectable } from '@angular/core';
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
  CollectionReference,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import ICategory from '../models/category.interface';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesSource = new BehaviorSubject<
    { items: ICategory[]; title: string }[]
  >([]);
  categories = this.categoriesSource.asObservable();

  constructor(private db: Firestore) {}

  async fetchCategories() {
    const collectionRef = collection(
      this.db,
      'categories'
    ) as CollectionReference<{ items: ICategory[]; title: string }>;
    let categories: { items: ICategory[]; title: string }[] = [];

    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((category) => {
      let data = category.data();
      categories.push(data);

      console.log(categories);
    });

    this.categoriesSource.next(categories);
    return;
  }
}
