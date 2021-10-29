import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

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
}