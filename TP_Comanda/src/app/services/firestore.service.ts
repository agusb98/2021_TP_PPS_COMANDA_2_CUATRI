import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/* 
Servicio no está siendo utilizado
 */
export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

  saveFile(file: any, path: string, name: string): Promise<string> {
    return new Promise(res => {
      const filePath = path + '/' + name;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.put(file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(res => {
            res(res);
            return;
          });
        })
      ).subscribe();
    });
  }
}