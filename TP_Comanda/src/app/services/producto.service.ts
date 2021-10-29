import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public mesasRef: AngularFirestoreCollection<Producto>; 
  constructor(public afStore: AngularFirestore) {
    this.mesasRef = this.afStore.collection("productos");
   }

  guardarNuevoProducto(producto:Producto):any{
    
    return this.mesasRef.add(Object.assign({},producto));
  }
}
