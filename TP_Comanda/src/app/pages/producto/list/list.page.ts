import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalPedidoPage } from '../../modal-pedido/modal-pedido.page';

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
    private router: Router,
    private qrProducto: BarcodeScanner,
    public navCtrl: NavController ,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.kyndSelected = this.kynds[0];
    this.getUser();
    this.getPedido();

    this.getList('sdf');

    //  If user wanna set something
    this.checkProductsSelected();
  }


  navigateBack(){
    this.navCtrl.back();
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

  setQuantity(model: Producto, $event, accion:string) {
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
          let g = { id: model.id, quantity: qua, price: model.precio, name: model.nombreProducto, time: model.tiempo };
          this.productsSelected.push(g);
        }
      }
      else {
        let g = { id: model.id, quantity: qua, price: model.precio, name: model.nombreProducto, time: model.tiempo };
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


  
  AddProducto(model: Producto, $event){
    /*  this.productos[index].selected = true;
      this.productos[index].cantidad++;
      this.total += this.productos[index].precio;
      this.CalcularDemora();*/

      this.setQuantity(model, $event, 'add');
    }
    
    RemoveProducto(model: Producto, $event){
    /*   if(this.productos[index].cantidad > 0){
         this.productos[index].cantidad--;
         if(this.productos[index].cantidad == 0){
          this.productos[index].selected = false;
         }
         this.total -= this.productos[index].precio;
         this.CalcularDemora();
       }*/

       this.setQuantity(model, $event, 'remove');
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

    const a = this.pedido$.subscribe(data => {
      this.redirectTo('pedido/id/' + data.id);
      a.unsubscribe();
    });
  }

  clickDetails(model: Producto) {
    this.redirectTo('producto/id/' + model.id);
  }

  getAproxFinish() {
    let seconds: number = 0;

    this.productsSelected.forEach(p => {
      seconds += p.time;
    });

    return seconds;
  }

  private getProductoIdAsString() {
    let s: any[] = [];

    this.productsSelected.forEach((p: Producto) => {
      s.push(p);
    });

    return s;
  }



  
  ScanQr() { 
    const options = { 
      prompt: "Escaneá el producto", 
      formats: 'QR_CODE',
      showTorchButton: true, 
      resultDisplayDuration: 2,};

    this.qrProducto.scan(options).then(data =>{
      this.AgregarConQr(data.text);
    }).catch(err => { 
      console.log(err); 
    });  
 }

 AgregarConQr(textqr:string){
   
  let obj = this.productsSelected.find(x => x.nombreProducto == textqr);
  let index = this.productsSelected.indexOf(obj)
  if (obj !== -1) { 
    this.productsSelected[index] = obj;
    this.openModal( this.productsSelected[index])
  } else {
   // this.toastSrv.error("No se encontro el producto buscado..",'Pedir producto');
   alert("No se encontro el producto buscado..");
  }
  

 // this.openModal(this.pr)
}


async openModal(producto) {
  const modal = await this.modalController.create({
  component: ModalPedidoPage,
  cssClass: 'my-modal-class',
  componentProps: { producto: producto }
  });
  modal.onDidDismiss().then(data=>{
    console.log(data)
   // this.productsSelected[this.index] = data.data;

   let g = { id: data.data.id, quantity: data.data.quantity, price: data.data.precio, name: data.data.nombreProducto, time: data.data.tiempo };
   this.productsSelected.push(g);
    this.getAcum(); 
  })
  return await modal.present();
}
}
