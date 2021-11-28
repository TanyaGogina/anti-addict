import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  constructor(private readonly firestore: AngularFirestore) {
  }

  getAppRules(): Observable<any> {
    return this.firestore.collection('appRules').valueChanges();
  }
}
