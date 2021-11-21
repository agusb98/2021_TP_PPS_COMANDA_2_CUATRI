import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  pathOfCollection = 'productos';
  referenceToCollection: AngularFirestoreCollection;

  constructor(private bd: AngularFirestore) {
    this.referenceToCollection =
      this.bd.collection<Producto>
        (this.pathOfCollection, ref => ref.orderBy('tipo', 'asc'));
  }

  public async createOne(model: Producto) {
    try {
      model.id = this.bd.createId();
      return await this.referenceToCollection.doc(model.id).set({ ...model });  //  llaves es objeto, 3 puntitos es dinamico
    }
    catch (err) { console.log(err); }
  }

  public async setOne(model: Producto) {
    try { return this.referenceToCollection.doc(model.id).set({ ...model }); }
    catch (err) { console.log(err); }
  }

  getBebidas() {
    return this.getByTipo('BEBIDA') as Observable<Producto[]>;
  }

  getComidas() {
    return this.getByTipo('COMIDA') as Observable<Producto[]>;
  }

  getPostres() {
    return this.getByTipo('POSTRE') as Observable<Producto[]>;
  }

  private getByTipo(tipo: string) {
    try {
      return this.getAll().pipe(
        map(foods => foods.filter(u => u.tipo.includes(tipo))));
    }
    catch (error) { }
  }

  getAll() {
    try {
      return this.referenceToCollection.snapshotChanges().pipe(
        map(foods => foods.map(a => a.payload.doc.data()))
      );
    }
    catch (error) { }
  }

  getById(id: string) {
    try {
      return this.getAll().pipe(
        map(tables => tables.find(u => u.id == id)));
    }
    catch (error) { }
  }
}