import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public prodRef: AngularFirestoreCollection<Producto>; 
  constructor(public afStore: AngularFirestore) {
    this.prodRef = this.afStore.collection("productos");
   }

  guardarNuevoProducto(producto:Producto):any{
    
    return this.prodRef.add(Object.assign({},producto));
  }

  TraerProductos(): Observable<any>{
    return this.prodRef.valueChanges({idField: "doc_id"});
  }
}
