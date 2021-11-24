import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { Anonimo } from 'src/app/models/anonimo';
import { AuthService } from 'src/app/services/auth.service';
import { CameraService } from 'src/app/services/camera.service';
import { FirestorageService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register-anonimo',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  form: FormGroup;


  validationUserMessage = {
    name: [
      { type: "required", message: "Por favor, ingrese nombre" },
      { type: "minlength", message: "El nombre debe tener 2 caractéres o más" },
      { type: "maxlength", message: "El nombre no puede tener más de 30 caractéres" },
      { type: "pattern", message: "El nombre ingresado es incorrecto, inténtelo de nuevo!" },
    ],
    img: [
      { type: "required", message: "Por favor, ingrese foto de perfil" },
    ]
  }


  constructor(
    private formbuider: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private vibration: Vibration,
    private toastr: ToastrService,
    private fs: FirestorageService,
    private userService: UserService,
    private cameraService: CameraService
  ) { }

  ngOnInit() { this.validateForm(); }

  validateForm() {
    this.form = this.formbuider.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ñ]+$'), Validators.maxLength(30), Validators.minLength(2)])),
      img: new FormControl('', Validators.compose([Validators.required])),
      profile: new FormControl('ANONIMO'),
    })
  }

  get name() { return this.form.get('name').value; }
  set name(data: string) { this.form.controls['name'].setValue(data); }

  get img() { return this.form.get('img').value; }
  set img(data: any) { this.form.controls['img'].setValue(data); }

  profile: string = '';
  email: string = '';
  password: string = "123456";

  async takePic() {
    const image = await this.cameraService.addNewToGallery();
    if (image) { this.img = image; }
  }

  onRegister() {
    this.email = this.name + '@anonimo.com';
    const user = this.authService.register(this.email, this.password);
    if (user) {
      const userAux = this.getDataUser();
      this.fs.saveImage(this.img, 'users', new Date().getTime() + '')
        .then(async url => {
          userAux.img = url;
//
          await this.userService.createOne(userAux);

          await this.authService.login(this.email, this.password);

          
          this.vibration.vibrate([500]);
          this.toastr.success('Datos guardados con éxito!', 'Registro de Usuario');
          this.resetForm();
<<<<<<< HEAD
          
          this.redirectTo('/home');
=======



>>>>>>> alpha
        });
    }
    else {
      this.vibration.vibrate([500, 500, 500]);
      this.toastr.error("Datos ingresados incorrectos", 'Registro de Usuario');
    }
  }

  getDataUser() {
    let user: Anonimo = null;

    user = {
      id: '',
      nombre: this.name,
      apellido: '',
      dni: '',
      img: this.img,
      estado: 'ACEPTADO',
<<<<<<< HEAD
      correo: this.email,
=======
      correo: '',
>>>>>>> alpha
      perfil: 'ANONIMO',
      fecha_creacion: new Date().getTime()
    };

    return user;
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  resetForm() { this.ngOnInit(); }
}