import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-id',
  templateUrl: './id.page.html',
  styleUrls: ['./id.page.scss'],
})

export class IdPage implements OnInit {

  pedido$: Observable<any>;

  constructor(
    private vibration: Vibration,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPedido();
  }

  getPedido() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pedido$ = this.pedidoService.getById(id);
  }

  getProductsSelected() {
    return JSON.parse(localStorage.getItem('products'));
  }

  clickConfirm(pedido: Pedido) {
    try {
        pedido.producto_id = this.getProductsSelected();
        this.pedidoService.setOne(pedido);

        this.vibration.vibrate([500]);
        this.toastr.success('Pedido registrado con éxito!', 'Estado de Pedido');

        this.redirectTo('/home');
    }
    catch (error) {
      this.vibration.vibrate([500, 500, 500]);
      this.toastr.error('Error inesperado al momento de registrar su pedido!', 'Estado de Pedido');
    }
  }

  getAcum() {
    let a = 0;

    if (this.getProductsSelected()) {
      this.getProductsSelected().forEach(p => {
        a += (p.quantity * p.price);
      });
    }

    return a;
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

}
