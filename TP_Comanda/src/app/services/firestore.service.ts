import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EncuestasCliente } from '../models/encuestaCliente';

@Injectable({
  providedIn: 'root'
})

export class FirestorageService {

  private dbpath = '/encuestasCliente';
  encuestaCollection: AngularFirestoreCollection<EncuestasCliente>;
  public encuestas: Observable<EncuestasCliente[]>;


  constructor(
    private db : AngularFirestore,
    private storage: AngularFireStorage
    ) { 

        this.encuestaCollection = db.collection(this.dbpath);
        this.encuestas = this.encuestaCollection.snapshotChanges().pipe(map(actions=>{
          return actions.map(a=>{
            const data = a.payload.doc.data() as EncuestasCliente;
            data.id_cliente = a.payload.doc.id;
            return data;
          });
        }));
    }

  async saveImage(img: Photo, path: string, name: string) {
    try {
      const response = await fetch(img.webPath!);
      const blob = await response.blob();
      const filePath = path + '/' + name;
      const uploadTask = this.saveFile(blob, filePath);

      return (await uploadTask).ref.getDownloadURL();
    }
    catch (error) { }
  }

  saveFile(file: Blob, filePath: string) {
    return this.storage.upload(filePath, file);
  }

  public addData(collection:string, json){
    this.db.collection(collection).add(json);
  }

  
  public getAllEncuesta(){
    return this.encuestas;
  }


}