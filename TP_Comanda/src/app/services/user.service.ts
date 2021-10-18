import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Anonimo } from '../models/anonimo';
import { Cliente } from '../models/cliente';
import { Duenio } from '../models/duenio';
import { Empleado } from '../models/empleado';
import { Supervisor } from '../models/supervisor';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  pathOfCollection = 'users';
  referenceToCollection: AngularFirestoreCollection;

  constructor(private bd: AngularFirestore) {
    this.referenceToCollection =
      this.bd.collection<Anonimo | Cliente | Duenio | Empleado | Supervisor>
        (this.pathOfCollection, ref => ref.orderBy('fecha_creacion', 'asc'));
  }

  public async createOne(model: User) {
    try {
      const result = await this.referenceToCollection.add({ ...model });  //  llaves es objeto, 3 puntitos es dinamico
      return result;
    }
    catch (error) { }
    return;
  }

  public checkMessage(message: Message): boolean {
    if (message.message.length < 1 || message.message.length > 22) {
      return false;
    }
    return true;
  }

  getAll() {
    try {
      return this.referenceToCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => a.payload.doc.data() as Message))
      );
    }
    catch (error) { }
  }

  getAllByClass(className: string) {
    try {
      return this.getAll().pipe(
        map(messages => messages.
          filter(m => m.class.
            includes(className))));
    }
    catch (error) { }
  }
}