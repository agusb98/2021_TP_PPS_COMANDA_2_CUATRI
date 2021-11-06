import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from 'src/app/models/mesa';
import { CameraService } from 'src/app/services/camera.service';
import { FirestorageService } from 'src/app/services/firestore.service';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})

export class AltaPage implements OnInit {
  
  form: FormGroup;
  nuevaMesa: Mesa;
  resultadoError: boolean = null;
  img:string;
  constructor(
    private formbuider: FormBuilder,
    private mesaSrv: MesaService,
    private router: Router,
    private cameraService:CameraService,
    private fs: FirestorageService, 
    private vibration: Vibration,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.img='';
    this.form = this.formbuider.group({
      numeroMesa: ['', [Validators.required]],
      numeroComensales: ['', [Validators.required]],
      tipo_mesa: ['', [Validators.required]] 
    });
  }

  crearMesa() {
    this.nuevaMesa = new Mesa();
    this.nuevaMesa.numeroMesa = this.form.get('numeroMesa').value;
    this.nuevaMesa.cantidadComensales = this.form.get('numeroComensales').value;
    this.nuevaMesa.tipo_mesa = this.form.get('tipo_mesa').value;
    this.nuevaMesa.img= this.img;
    this.mesaSrv.guardarNuevaMesa(this.nuevaMesa).then((res) => {
       
      this.vibration.vibrate([500]);
      this.toastr.success('Datos guardados con éxito!', 'Registro de Mesa');
      this.resetForm();

    }).catch((err) => {
      this.resultadoError = true;
    })
  }


  
  resetForm() { this.ngOnInit(); }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  tomarFotoMesa() { 
      this.addPhotoToGallery(); 
  }

  async addPhotoToGallery() {
    const photo = await this.cameraService.addNewToGallery();
    this.uploadPhoto(photo).then().catch((err) => {
      console.log("Error addPhotoToGallery", err);
    });
  }
 
  
  private async uploadPhoto(cameraPhoto: Photo) {
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    const filePath = this.getFilePath();

    const uploadTask = this.fs.saveFile(blob, filePath);

    
    uploadTask.then(async res => {
      const downloadURL = await res.ref.getDownloadURL();
      if (downloadURL.length > 0) {
        console.log("URL  CORRECTO- i_IMG++"); 
          this.img= downloadURL; 
        console.log(  "  URL:" + this.img);
         
      } else {
        console.log("IMAGEN NO CORRECTA . NO SE CONTABILIZA " );
      } 
    })
      .catch((err) => {
        console.log("Error al subbir la imagen: ", err);
      });
  }

  getFilePath() {
    return 'mesas/' + new Date().getTime();
  }
 
}
