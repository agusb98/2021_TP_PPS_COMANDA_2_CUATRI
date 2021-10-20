import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { Duenio } from 'src/app/models/duenio';
import { Supervisor } from 'src/app/models/supervisor';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register-duenio_super',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  form: FormGroup;

  listEmployees = [
    { kynd: 'DUENIO' },
    { kynd: 'SUPERVISOR' },
  ]

  validationUserMessage = {
    name: [
      { type: "required", message: "Por favor, ingrese nombre" },
      { type: "minlength", message: "El nombre debe tener 2 caractéres o más" },
      { type: "maxlength", message: "El nombre no puede tener más de 30 caractéres" },
      { type: "pattern", message: "El nombre ingresado es incorrecto, inténtelo de nuevo!" },
    ],
    surname: [
      { type: "required", message: "Por favor, ingrese apellido" },
      { type: "minlength", message: "El apellido debe tener 2 caractéres o más" },
      { type: "maxlength", message: "El apellido no puede tener más de 30 caractéres" },
      { type: "pattern", message: "El apellido ingresado es incorrecto, inténtelo de nuevo!" },
    ],
    dni: [
      { type: "required", message: "Por favor, ingrese DNI" },
      { type: "max", message: "El DNI debe tener 8 dígitos" },
      { type: "min", message: "El DNI debe tener 8 dígitos" }
    ],
    cuil: [
      { type: "required", message: "Por favor, ingrese CUIL" },
      { type: "max", message: "El CUIL debe tener 11 dígitos" },
      { type: "min", message: "El CUIL debe tener 11 dígitos" }
    ],
    img: [
      { type: "required", message: "Por favor, ingrese foto de perfil" },
    ],
    profile: [
      { type: "required", message: "Por favor, seleccione el tipo de empleado" },
    ],
    email: [
      { type: "required", message: "Por favor, ingrese correo" },
      { type: "maxlength", message: "El correo no puede tener más de 30 caractéres" },
      { type: "pattern", message: "El correo ingresado es incorrecto, inténtelo de nuevo!" }
    ],
    password: [
      { type: "required", message: "Por favor, ingrese contraseña" },
      { type: "minlength", message: "La contraseña debe tener 6 caractéres o más" },
      { type: "maxlength", message: "La contraseña no puede tener más de 15 caractéres" },
    ]
  }

  constructor(
    private camera: Camera,
    private router: Router,
    private vibration: Vibration,
    private toastr: ToastrService,
    private formbuider: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() { this.validateForm(); }

  validateForm() {
    this.form = this.formbuider.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]+$'), Validators.maxLength(30), Validators.minLength(2)])),
      surname: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]+$'), Validators.maxLength(30), Validators.minLength(2)])),
      dni: new FormControl('', Validators.compose([Validators.required, Validators.min(11111111), Validators.max(99999999)])),
      cuil: new FormControl('', Validators.compose([Validators.required, Validators.min(11111111111), Validators.max(99999999999)])),
      img: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]+$')])),
      profile: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.maxLength(35)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])),
    })
  }

  get name() { return this.form.get('name').value; }
  set name(str: string) { this.form.controls['name'].setValue(str); }

  get surname() { return this.form.get('surname').value; }
  set surname(str: string) { this.form.controls['surname'].setValue(str); }

  get dni() { return this.form.get('dni').value; }
  set dni(str: number) { this.form.controls['dni'].setValue(str); }

  get cuil() { return this.form.get('cuil').value; }
  set cuil(str: number) { this.form.controls['cuil'].setValue(str); }

  get img() { return this.form.get('img').value; }
  set img(str: string) { this.form.controls['img'].setValue(str); }

  get profile() { return this.form.get('profile').value; }
  set profile(str: string) { this.form.controls['profile'].setValue(str); }

  get email() { return this.form.get('email').value; }
  set email(str: string) { this.form.controls['email'].setValue(str); }

  get password() { return this.form.get('password').value; }
  set password(str: string) { this.form.controls['password'].setValue(str); }

  scannQR() {
    /* const options = { prompt: 'Escaneá el DNI', formats: 'PDF_417' };

    try {
      this.barcodeScanner.scan(options).then(barcodeData => {
        const data = barcodeData.text.split('@');

        this.name = data[2];
        this.dni = + data[4]; //needs to be number
        this.surname = data[1];
        this.cuil = + ('20' + this.dni + '7');  //generate cuil auto
      });
    }
    catch (error) { } */
  }

  takePic() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      quality: 30
    }
    this.camera.getPicture(options)
      .then(data => {
        this.img = `data:image/jpeg;base64,${data}`;
      });
  }

  async onRegister() {
    const auth = this.authService.register(this.email, this.password);
    if (auth) {
      const user = this.getDataUser();

      if (this.userService.createOne(user)) {
        this.vibration.vibrate([1000, 500, 1000]);
        this.toastr.success('Bienvenido!', 'Registro de Usuario');
        this.redirectTo('home');
      }
    }
    else {
      this.vibration.vibrate([1000]);
      this.toastr.error("Datos ingresados incorrectos", 'Registro de Usuario');
    }
  }

  getDataUser() {
    let user: Duenio | Supervisor = null;

    if (this.profile == 'DUENIO') {
      user = {
        id: '',
        nombre: this.name,
        apellido: this.surname,
        dni: this.dni,
        cuil: this.cuil,
        img: this.img,
        estado: 'PENDIENTE',
        correo: this.email,
        perfil: 'DUENIO',
        fecha_creacion: new Date().getTime()
      };
    }
    else {
      user = {
        id: '',
        nombre: this.name,
        apellido: this.surname,
        dni: this.dni,
        cuil: this.cuil,
        img: this.img,
        estado: 'PENDIENTE',
        correo: this.email,
        perfil: 'SUPERVISOR',
        fecha_creacion: new Date().getTime()
      };
    }
    return user;
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

}