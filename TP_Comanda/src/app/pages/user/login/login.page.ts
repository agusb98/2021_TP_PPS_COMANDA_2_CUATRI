import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MailService } from 'src/app/services/mail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  form: FormGroup;

  users = [
    { email: "duenio@duenio.com", password: "111111", icon: "😎" },
    { email: "supervisor@supervisor.com", password: "222222", icon: "🧐" },
    //{ email: "anonimo@anonimo.com", password: "anonimo", icon: "❓" },
    { email: "metre@metre.com", password: "123456", icon: "💂" },
    { email: "mozo@mozo.com", password: "444444", icon: "👨‍💼" },
    { email: "cocinero@cocinero.com", password: "555555", icon: "👨‍🍳" },
    { email: "bartender@bartender.com", password: "666666", icon: "🍻" },
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
    private userService: UserService,
    private mailService: MailService,
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


  imgUser: string = '';

  selectUser(user) {
    this.email = user.email;
    this.password = user.password;
    this.imgUser = user.icon;
  }

  async onAnonymous() {
      this.redirectTo('user/register/anonimo');
  }
    

  async onLogin() {
    const auth = await this.authService.login(this.email, this.password);
    let dataUser;
    this.userService.getByEmail(this.email).subscribe(data => {
      dataUser = data;
    });

    setTimeout(() => {
      if (auth) {
        if (dataUser.estado == 'ACEPTADO') {
          this.vibration.vibrate([500]);
          localStorage.setItem('user', JSON.stringify(dataUser));
          this.toastr.success('Ingreso con éxito', 'Iniciar Sesión');
          this.redirectTo('/home');
        }
        else {
          this.vibration.vibrate([500, 500, 500]);
          this.toastr.error('Aún no fue habilitado por administración, sea paciente', 'Iniciar Sesión');
        }
      }
      else { this.toastr.error('Email/Contraseña Incorrecto', 'Iniciar Sesión'); }
    }, 4000);

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