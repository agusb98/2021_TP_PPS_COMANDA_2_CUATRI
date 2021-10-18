import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  pathOfCollection = 'users';
  referenceToCollection: AngularFirestoreCollection;

  constructor(private bd: AngularFirestore) {
    this.referenceToCollection = this.bd.collection<Message>(this.pathOfCollection, ref => ref.orderBy('date', 'asc'));
  }

  public async createOne(message: Message) {
    try {
      const result = await this.referenceToCollection.add({ ...message });  //  llaves es objeto, 3 puntitos es dinamico
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