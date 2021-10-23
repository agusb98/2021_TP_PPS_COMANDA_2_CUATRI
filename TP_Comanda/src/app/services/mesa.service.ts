import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mesa } from '../models/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  public mesasRef: AngularFirestoreCollection<Mesa>; 
  constructor(public afStore: AngularFirestore) {
    this.mesasRef = this.afStore.collection("mesas");
   }

   guardarNuevaMesa(nuevaMesa: Mesa): any{
    return this.mesasRef.add(Object.assign({},nuevaMesa));
  }
}
