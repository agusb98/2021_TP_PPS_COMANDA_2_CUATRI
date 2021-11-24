import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Mesa } from '../models/mesa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MesaService {

  pathOfCollection = 'mesas';
  referenceToCollection: AngularFirestoreCollection;

  constructor(private bd: AngularFirestore) {
    this.referenceToCollection =
      this.bd.collection<Mesa>
        (this.pathOfCollection, ref => ref.orderBy('numero', 'asc'));
  }

  public async createOne(model: Mesa) {
    try {
      model.id = this.bd.createId();
      return await this.referenceToCollection.doc(model.id).set({ ...model });  //  llaves es objeto, 3 puntitos es dinamico
    }
    catch (err) { console.log(err); }
  }

  public async setOne(model: Mesa) {
    try { return this.referenceToCollection.doc(model.id).set({ ...model }); }
    catch (err) { console.log(err); }
  }

  getComunes() {
    return this.getByKynd('COMUN') as Observable<Mesa[]>;
  }

  getDiscapacitados() {
    return this.getByKynd('DISCAPACITADOS') as Observable<Mesa[]>;
  }

  getVips() {
    return this.getByKynd('VIP') as Observable<Mesa[]>;
  }

  private getByKynd(tipo: string) {
    try {
      return this.getAll().pipe(
        map(tables => tables.filter(u => u.tipo.includes(tipo))));
    }
    catch (error) { }
  }

  getByStatus(estado: 'DISPONIBLE' | 'RESERVADO') {
    try {
      return this.getAll().pipe(
        map(tables => tables.filter(u => u.estado.includes(estado))));
    }
    catch (error) { }
  }

  getAll() {
    try {
      return this.referenceToCollection.snapshotChanges().pipe(
        map(tables => tables.map(a => a.payload.doc.data()))
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