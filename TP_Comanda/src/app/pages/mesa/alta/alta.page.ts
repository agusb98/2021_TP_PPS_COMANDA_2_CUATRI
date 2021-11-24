import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Mesa } from 'src/app/models/mesa';
import { CameraService } from 'src/app/services/camera.service';
import { FirestorageService } from 'src/app/services/firestore.service';
import { MesaService } from 'src/app/services/mesa.service';
import { QrService } from 'src/app/services/qr.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})

export class AltaPage implements OnInit {

  form: FormGroup;
  resultadoError: boolean = null;
  img: any;

  constructor(
    private formbuider: FormBuilder,
    private mesaSrv: MesaService,
    private cameraService: CameraService,
    private fs: FirestorageService,
    private vibration: Vibration,
    private toastr: ToastrService,
    private qrService: QrService,
    private router: Router,
    public navCtrl: NavController
  ) { }

 

  navigateBack(){
    this.navCtrl.back();
  }

  ngOnInit() {
    this.img='';
    this.form = this.formbuider.group({
      numero: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }

  async takePic() {
    const image = await this.cameraService.addNewToGallery();
    if (image) { this.img = image; }
  }

  //  TODO:: NO PUDE CON MISMO NUMERO..
  crearMesa() {
    let model = this.getDataModel();
    // let flag;

    try {
      // this.mesaSrv.getByNumber(model.numero).subscribe(data => {
      //   if (data == undefined) { flag = true; }
      //   else { flag = false; }
      // }).unsubscribe();

      // if (flag) {
        //this.qrService.createQR('mesa_' + model.id);  //  Ni idea
        this.fs.saveImage(this.img, 'mesas', new Date().getTime() + '')
          .then(url => {
            model.img = url;

            this.mesaSrv.createOne(model);
            this.vibration.vibrate([500]);
            this.toastr.success('Datos guardados con éxito!', 'Alta de Mesa');
            this.resetForm();
          });
      // }
      // else {
      //   this.toastr.error('Número de mesa ya existente, por favor ingrese otro número', 'Alta de Mesa');
      //   this.vibration.vibrate([500, 500, 500]);
      // }
    }
    catch (error) {
      this.toastr.error('Error al momento de registrar, por favor revise los datos ingresados!', 'Alta de Mesa');
      this.vibration.vibrate([500, 500, 500]);
    }
  }

  private getDataModel() {
    let model: Mesa = {
      id: '',
      img: '',
      estado: 'DISPONIBLE',
      tipo: this.form.get('tipo').value,
      numero: this.form.get('numero').value,
      cantidad: this.form.get('cantidad').value,
    };

    return model;
  }


  
  resetForm() { this.ngOnInit(); }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
 
}
