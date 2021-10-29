import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mesa } from 'src/app/models/mesa';
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

  constructor(
    private formbuider: FormBuilder,
    private mesaSrv: MesaService,
    private router: Router
  ) { }

  ngOnInit() {
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

    this.mesaSrv.guardarNuevaMesa(this.nuevaMesa).then((res) => {
      console.log(res);
      this.resultadoError = false;
    }).catch((err) => {
      this.resultadoError = true;
    })
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
