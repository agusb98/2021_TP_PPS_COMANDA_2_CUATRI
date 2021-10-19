import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-cliente',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  form: FormGroup;

  validationUserMessage = {
    email: [
      { type: "required", message: "Por favor, ingrese correo" },
      { type: "pattern", message: "El correo ingresado es incorrecto, inténtelo de nuevo!" }
    ],
    password: [
      { type: "required", message: "Por favor, ingrese contraseña" },
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

  async onRegister() {
    const user = await this.authService.register(this.email, this.password);
    if (user) {
      this.vibration.vibrate([1000, 500, 1000]);
      this.toastr.success('Bienvenido!', 'Registro de Usuario');
      this.redirectTo('home');
    }
    else {
      this.vibration.vibrate([1000]);
      this.toastr.error("Datos ingresados incorrectos", 'Registro de Usuario');
    }
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
    this.ngOnDestroy();
  }

  ngOnDestroy() { this.form = null; }

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