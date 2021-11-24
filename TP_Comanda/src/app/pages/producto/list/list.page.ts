import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  user;
  productsSelected: any[] = [];

  list$: Observable<any>;
  pedido$: Observable<any>;

  kyndSelected;
  kynds = [
    { val: 'Comida', img: 'assets/images/default.png' },
    { val: 'Bebida', img: 'assets/images/default.png' },
    { val: 'Postre', img: 'assets/images/default.png' },
  ]


  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.kyndSelected = this.kynds[0];
    this.getUser();
    this.getPedido();

    this.getList('sdf');

    //  If user wanna set something
    this.checkProductsSelected();
  }

  hasToSet(model: Producto) {
    let quantity = 0;

    if (this.productsSelected) {
      this.productsSelected.forEach(p => {
        
        if (p.id == model.id) {
          quantity = p.quantity;
        }
      });
    }
    return quantity;
  }

  private checkProductsSelected() {
    let a = JSON.parse(localStorage.getItem('products'));
    if (a) { this.productsSelected = a; }
  }

  private getUser() {
    this.user = null;
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private getPedido() {
    this.pedido$ = this.pedidoService.getLastByUser(this.user.correo);
  }

  setFilter(p) {
    this.kyndSelected = p;
    this.getList(p.val);
  }

  getList(filter: string) {
    switch (filter) {
      case 'Postre':
        this.list$ = this.productoService.getPostres();
        break;

      case 'Bebida':
        this.list$ = this.productoService.getBebidas();
        break;

      default:
        this.list$ = this.productoService.getComidas();
        break;
    }
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  setQuantity(model: Producto, $event) {
    let qua = $event.target.value;

    if (qua > 0) {
      if (this.productsSelected) {
        let a = this.productsSelected.find(x => x.id == model.id);
        let index = this.productsSelected.indexOf(a)

        if (index >= 0) {
          a.quantity = qua;
          this.productsSelected[index] = a;
        }
        else {
          let g = { id: model.id, quantity: qua, price: model.precio, name: model.nombreProducto };
          this.productsSelected.push(g);
        }
      }
      else {
        let g = { id: model.id, quantity: qua, price: model.precio, name: model.nombreProducto };
        this.productsSelected.push(g);
      }
    }
    else if (qua == 0) {
      if (this.productsSelected) {
        let a = this.productsSelected.find(x => x.id == model.id);
        let index = this.productsSelected.indexOf(a);
        this.productsSelected.splice(index, 1);
      }
    }
  }

  getAcum() {
    let a = 0;

    if (this.productsSelected) {
      this.productsSelected.forEach(p => {
        a += (p.quantity * p.price);
      });
    }

    return a;
  }

  clickBeforeConfirm() {
    let products = this.getProductoIdAsString();
    localStorage.setItem('products', JSON.stringify(products));

    this.pedido$.subscribe(data => {
      this.redirectTo('pedido/id/' + data.id);
    });
  }

  private getProductoIdAsString() {
    let s: any[] = [];

    this.productsSelected.forEach(p => {
      let aux = { id: p.id, quantity: p.quantity, price: p.price, name: p.name };
      s.push(aux);
    });

    return s;
  }
}
