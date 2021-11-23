import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { ToastrService } from 'ngx-toastr';
import { MesaService } from 'src/app/services/mesa.service';
import { Mesa } from 'src/app/models/mesa';

@Component({
  selector: 'app-list-mesa',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  requests$: Observable<any>;

  tables: any;

  kyndSelected;
  kynds = [
    { val: 'Pendientes', img: 'assets/images/default.png' },
    { val: 'Cancelados', img: 'assets/images/default.png' },
    { val: 'Aceptados', img: 'assets/images/default.png' },
    { val: 'Confirmados', img: 'assets/images/default.png' },
    { val: 'A cobrar', img: 'assets/images/default.png' },
    { val: 'Cobrados', img: 'assets/images/default.png' },
  ];


  constructor(
    private reqService: PedidoService,
    private tblService: MesaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.kyndSelected = this.kynds[0];
    this.getRequests(this.kyndSelected.val);


    //  es una mierda esta parte..
    this.getAllTables();
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

  getRequests(filter: string) {
    switch (filter) {
      case 'Cancelados':
        this.requests$ = this.reqService.getCancelados();
        break;

      case 'Aceptados':
        this.requests$ = this.reqService.getAceptados();
        break;

      case 'Confirmados':
        this.requests$ = this.reqService.getConfirmados();
        break;

      case 'A cobrar':
        this.requests$ = this.reqService.getToCobrar();
        break;

      case 'Cobrados':
        this.requests$ = this.reqService.getCobrados();
        break;

      default:
        this.requests$ = this.reqService.getPendientes();
        break;
    }
  }

  setStatus(model: Pedido, status) {
    model.estado = status;
    try {
      this.reqService.setOne(model);

      if (model.estado == 'COBRADO') {

        this.tables.forEach(t => {
          if (t.numero == model.mesa_numero) {
            t.estado = 'DISPONIBLE';
            this.setStatusTable(t);
            this.toastr.success('Datos registrados, ahora la mesa Nº ' + t.numero + ' se encuentra Disponible', 'Estado de Pedido');
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

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
