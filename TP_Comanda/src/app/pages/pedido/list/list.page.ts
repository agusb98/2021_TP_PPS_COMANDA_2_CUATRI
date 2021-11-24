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

        this.waits.reverse().forEach(t => {
          if (t.correo == model.correo) {
            this.setStatusWait(t);
          }
        });

        this.tables.forEach(t => {
          if (t.numero == model.mesa_numero) {
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

  private setStatusWait(waitzzz: WaitList) {
    waitzzz.estado = 'FINALIZADO';
    this.waitService.setOne(waitzzz);
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }
}
