import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  form: FormGroup;

  users = [
    { "email": "duenio@duenio.com", "password": "111111" },
    { "email": "supervisor@supervisor.com", "password": "222222" },
    { "email": "metre@metre.com", "password": "333333" },
    { "email": "mozo@mozo.com", "password": "444444" },
    { "email": "cocinero@cocinero.com", "password": "555555" },
    { "email": "bartender@bartender.com", "password": "666666" },
  ]

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
    private router: Router,
    private vibration: Vibration,
    private toastr: ToastrService,
    private formbuider: FormBuilder,
    private authService: AuthService,
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
  set email(str: string) { this.form.controls['email'].setValue(str); }

  get password() { return this.form.get('password').value; }
  set password(str: string) { this.form.controls['password'].setValue(str); }

  selectUser(user) {
    this.email = user.email;
    this.password = user.password;
  }

  async onLogin() {
    this.authService.login(this.email, this.password).then((user) => {
      if (user) {
        this.vibration.vibrate([1000, 500, 1000]);
        this.toastr.success('Ingreso con Exito', 'Iniciar Sesión');
        this.redirectTo('/home');
      }
      else {
        this.vibration.vibrate([1000]);
        this.toastr.error('Email/Contraseña Incorrecto', 'Iniciar Sesión');
      }
    })
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
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