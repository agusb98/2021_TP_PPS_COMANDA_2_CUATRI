import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Mesa } from 'src/app/models/mesa';
import { Pedido } from 'src/app/models/pedido';
import { WaitList } from 'src/app/models/waitList';
import { MesaService } from 'src/app/services/mesa.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { WaitListService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-list-wait',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  waitSelected;

  waits$: Observable<any>;
  tables$: Observable<any>;

  kyndSelected;
  kynds = [
    { val: 'Activos', img: 'assets/images/default.png' },
    { val: 'Inactivos', img: 'assets/images/default.png' },
    { val: 'Cancelados', img: 'assets/images/default.png' },
    { val: 'Usados', img: 'assets/images/default.png' },
  ];

  constructor(
    private router: Router,
    private vibration: Vibration,
    private toastr: ToastrService,
    private tableService: MesaService,
    private waitService: WaitListService,
    private pedidoService: PedidoService,
  ) { }

  ngOnInit() {
    this.kyndSelected = this.kynds[0];
    this.getWaits(this.kyndSelected.val);
    this.getTables();
  }

  setFilter(p) {
    this.kyndSelected = p;
    this.getWaits(p.val);
  }

  getTables() {
    this.tables$ = this.tableService.getByStatus('DISPONIBLE');
  }

  getWaits(filter: string) {
    switch (filter) {
      case 'Usados':
        this.waits$ = this.waitService.getUsados();
        break;

      case 'Inactivos':
        this.waits$ = this.waitService.getInactivos();
        break;

      case 'Cancelados':
        this.waits$ = this.waitService.getCancelados();
        break;

      default:
        this.waits$ = this.waitService.getPendientes();
        break;
    }
  }

  clickWait(model: WaitList) {
    this.waitSelected = model;
  }

  clickConfirm(model: Mesa) {
    try {
      this.waitSelected.estado = 'EN USO';
      this.waitService.setOne(this.waitSelected);

      model.estado = 'RESERVADO';
      this.tableService.setOne(model);

      let p: Pedido = this.createModelPedido(model);
      this.pedidoService.createOne(p);

      this.vibration.vibrate([500]);
      this.toastr.success('Datos guardados con éxito!', 'Registro de Usuario');
    }
    catch (error) {
      this.vibration.vibrate([500, 500, 500]);
      this.toastr.error("Datos ingresados incorrectos", 'Registro de Usuario');
    }

    this.waitSelected = null;
  }

  clickCancel(model: WaitList) {
    model.estado = 'CANCELADO';
    this.waitService.setOne(model);
  }

  clickBack() {
    this.waitSelected = null;
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  private createModelPedido(mesa: Mesa) {
    let m: Pedido = {
      id: '',
      correo: this.waitSelected.correo,
      mesa_numero: mesa.numero,
      producto_id: '',
      date_created: new Date().getTime(),
      estado: 'PENDIENTE'
    }
    return m;
  }
}
