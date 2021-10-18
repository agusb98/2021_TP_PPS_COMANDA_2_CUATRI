import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  form: FormGroup;

  validationUserMessage = {
    email: [
      { type: "required", message: "Por favor, ingrese su correo" },
      { type: "pattern", message: "El correo ingresado es incorrecto, inténtelo de nuevo!" }
    ],
    password: [
      { type: "required", message: "Por favor, ingrese su contraseña" },
      { type: "minlength", message: "La contraseña debe tener 6 caractéres o más" }
    ]
  }

  constructor(
    private formbuider: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private vibration: Vibration,
    private toastr: ToastrService
  ) { }

  ngOnInit() { this.validateForm(); }

  validateForm() {
    this.form = this.formbuider.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
  }

  get email() { return this.form.get('email').value; }

  get password() { return this.form.get('password').value; }

  set email(str: string) { this.form.controls['email'].setValue(str); }

  set password(str: string) { this.form.controls['password'].setValue(str); }

  seleccionarUsuario(user) {
    this.email = user.email;
    this.password = user.password;
  }

  async onLogin() {
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        localStorage.setItem('email', this.email); //Save user data in the local storage
        this.vibration.vibrate([1000, 500, 1000]);
        this.toastr.success('Ingreso con Exito', 'Iniciar Sesión');
        this.router.navigate(['room']);
      }
    }
    catch (error) {
      this.vibration.vibrate([1000]);
      this.toastr.error('Email/Contraseña Incorrecto', 'Iniciar Sesión');
    }
  }

  async onRegister() {
    try {
      const user = await this.authService.register(this.email, this.password);
      if (user) {
        localStorage.setItem('email', this.email); //Save user data in the local storage
        this.vibration.vibrate([1000, 500, 1000]);
        this.toastr.success('Bienvenido!', 'Registro de Usuario');
        this.router.navigate(['room']);
      }
    }
    catch (error) {
      this.vibration.vibrate([1000]);
      this.toastr.error(error.message, 'Registro de Usuario');
    }
  }

  /* async onLoginGoogle() {
    try {
      const user = await this.authService.loginGoogle();
      if (user) {
        const isVerified = this.authService.isEmailVerified(user);
        this.redirectUser(isVerified, 'home', 'verify-email');
      }
    }
    catch (error) { }
  }

  async onLoginFacebook() {
    try {
      const user = await this.authService.loginFacebook();
      if (user) {
        const isVerified = this.authService.isEmailVerified(user);
        this.redirectUser(isVerified, 'home', 'verify-email');
      }
    }
    catch (error) { }
  } */
}