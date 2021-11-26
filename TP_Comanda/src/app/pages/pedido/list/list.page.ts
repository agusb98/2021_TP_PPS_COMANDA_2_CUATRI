import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { ToastrService } from 'ngx-toastr';
import { MesaService } from 'src/app/services/mesa.service';
import { Mesa } from 'src/app/models/mesa';
import { WaitListService } from 'src/app/services/wait.service';
import { WaitList } from 'src/app/models/waitList';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-list-mesa',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  requests$: Observable<any>;

  tables: any;
  waits: any;

  kyndSelected;
  kynds = [
    { val: 'Activos', img: 'assets/images/default.png' },
    { val: 'Inactivos', img: 'assets/images/default.png' },
  ];


  constructor(
    private reqService: PedidoService,
    private tblService: MesaService,
    private waitService: WaitListService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.kyndSelected = this.kynds[0];
    this.getRequests(this.kyndSelected.val);


    //  es una mierda esta parte..
    this.getAllTables();
    this.getAllWaits();
  }

  setFilter(p) {
    this.kyndSelected = p;
    this.getRequests(p.val);
  }

  private getAllTables() {
    this.tblService.getAll().subscribe(data => {
      this.tables = data;
    })
  }

  private getAllWaits() {
    this.waitService.getAll().subscribe(data => {
      this.waits = data;
    })
  }

  getRequests(filter: string) {
    switch (filter) {
      case 'Inactivos':
        this.requests$ = this.reqService.getInactivos();
        break;

      default:
        this.requests$ = this.reqService.getActivos();
        break;
    }
  }

  setStatus(model: Pedido, status) {
    model.estado = status;
    model.date_updated = new Date().getTime();
    
    try {
      this.reqService.setOne(model);

      if (model.estado == 'COBRADO') {

        this.waits.reverse().forEach(t => {
          if (t.correo == model.correo) {
            this.setStatusWait(t);
          }
        });

        this.tables.forEach(t => {
          if (t.numero == model.mesa_numero) {
            this.setStatusTable(t);
            this.toastr.success('Datos registrados, ahora la mesa Nº ' + t.numero + ' está Disponible', 'Estado de Pedido');
          }
        });
      }
    }
    catch (error) { this.toastr.error('Error inesperado al momento de cambiar estado del pedido', 'Acción') }
  }

  private setStatusTable(mesa: Mesa) {
    mesa.estado = 'DISPONIBLE';
    this.tblService.setOne(mesa);
  }

  private setStatusWait(waitzzz: WaitList) {
    waitzzz.estado = 'FINALIZADO';
    this.waitService.setOne(waitzzz);
  }

  getQuestion(status: string) {
    switch (status) {
      case 'PENDIENTE':
        return '¿Aceptar?';
      case 'COBRAR':
        return '¿Pagó?';
      default:
        return '';
    }
  }

  clickDetails(model: Producto) {
    this.redirectTo('producto/id/' + model.id);
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
