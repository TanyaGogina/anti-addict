import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  constructor(private readonly firestore: AngularFirestore) {
  }

  getAppRules(): Observable<any> {
    return this.firestore.collection('appRules').valueChanges();
  }

  getAddictions(username: string): Observable<any> {
    return this.firestore.collection(username).valueChanges().pipe(take(1));
  }

  saveAddictions(addictions: any[], username): Promise<any> {
    return this.firestore.collection(username).doc('app').set({app: addictions});
  }
}
