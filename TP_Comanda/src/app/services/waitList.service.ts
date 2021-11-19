import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WaitList } from '../models/wait_list';

@Injectable({
  providedIn: 'root'
})

export class WaitListService {

  pathOfCollection = 'wait_list';
  referenceToCollection: AngularFirestoreCollection;

  constructor(private bd: AngularFirestore) {
    this.referenceToCollection =
      this.bd.collection<WaitList>
        (this.pathOfCollection, ref => ref.orderBy('date_created', 'asc'));
  }

  public async createOne(model: WaitList) {
    try {
      model.id = this.bd.createId();
      return await this.referenceToCollection.doc(model.id).set({ ...model });  //  llaves es objeto, 3 puntitos es dinamico
    }
    catch (err) { console.log(err); }
  }

  public async setOne(model: WaitList) {
    try { return this.referenceToCollection.doc(model.id).set({ ...model }); }
    catch (err) { console.log(err); }
  }

  getActivos() {
    return this.getByKynd('ACTIVO') as Observable<WaitList[]>;
  }

  getInactivos() {
    return this.getByKynd('INACTIVO') as Observable<WaitList[]>;
  }

  getUsados() {
    return this.getByKynd('EN USO') as Observable<WaitList[]>;
  }

  private getByKynd(estado: string) {
    try {
      return this.getAll().pipe(
        map(waits => waits.filter(u => u.estado.includes(estado))));
    }
    catch (error) { }
  }

  getAll() {
    try {
      return this.referenceToCollection.snapshotChanges().pipe(
        map(waits => waits.map(a => a.payload.doc.data()))
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

  getByNumber(numero: number) {
    try {
      return this.getAll().pipe(
        map(tables => tables.find(u => u.numero == numero)));
    }
    catch (error) { }
  }

  getByUser(correo: string) {
    try {
      return this.getAll().pipe(
        map(tables => tables.find(u => u.correo == correo)));
    }
    catch (error) { }
  }
}