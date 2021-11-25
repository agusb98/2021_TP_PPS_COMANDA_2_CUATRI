import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-id',
  templateUrl: './id.page.html',
  styleUrls: ['./id.page.scss'],
})

export class IdPage implements OnInit {

  pedido$: Observable<any>;
  table$: Observable<any>

  constructor(
    private vibration: Vibration,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private router: Router,
    private qrProducto: BarcodeScanner,
    public navCtrl: NavController
  ) {

  }

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

  clickPendiente(pedido: Pedido) {
    pedido.producto_id = this.getProductsSelected();
    this.myWeirdNotification(pedido, 'Pedido registrado con éxito!');
  }

  clickRecibido(pedido: Pedido) {
    pedido.estado = 'CONFIRMADO';
    this.myWeirdNotification(pedido, 'Gracias por confirmar recepción!');
  }

  clickCobrar(pedido: Pedido) {
    pedido.estado = 'COBRAR';
    this.myWeirdNotification(pedido, 'Gracias por informar, en breves se le acercará un mozo!');
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

  private myWeirdNotification(new_pedido: Pedido, message: string) {
    try {
      this.pedidoService.setOne(new_pedido);

      this.vibration.vibrate([500]);
      this.redirectTo('/home');
      this.toastr.success(message, 'Estado de Pedido');
    }
    catch (error) {
      this.vibration.vibrate([500, 500, 500]);
      this.toastr.error('Error inesperado al momento de registrar su pedido!', 'Estado de Pedido');
    }
  }

  getAproxFinish() {
    let seconds: number = 0;

    this.getProductsSelected().forEach(p => {
      seconds += p.time;
    });

    return seconds;
  }

  getTitle(status: string) {
    switch (status) {
      case 'PENDIENTE':
        return 'Confirmar Pedido';

      case 'ACEPTADO':
        return 'Confirmar Recepción a su Mesa';

      case 'CONFIRMADO':
        return 'Pedir Cuenta para Pagar';

      case 'COBRAR':
        return 'Confirmar Pago Efectuado';

      case 'COBRAR':
        return 'Realizar Encuesta';

      case 'COBRADO':
        return 'Recomendación del Cliente';

      default:
        return '';
    }
  }

  AddProducto(index: number) {

  }
  RemoveProducto(nombre: string, index: number) { }
  /* AddProducto(index:number){
     this.productos[index].selected = true;
     this.productos[index].cantidad++;
     this.total += this.productos[index].precio;
     this.CalcularDemora();
   }
   RemoveProducto(nombre:string,index:number){
      if(this.productos[index].cantidad > 0){
        this.productos[index].cantidad--;
        if(this.productos[index].cantidad == 0){
         this.productos[index].selected = false;
        }
        this.total -= this.productos[index].precio;
        this.CalcularDemora();
      }
   }*/

   navigateBack(){
    this.navCtrl.back();
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
    
 /* let obj = this.productos.findIndex( x => x.doc_id == textqr);
  if (obj !== -1) {
    console.log(obj)
    this.saveProdIndex = obj;
    console.log(this.saveProdIndex)
    this.openModal(this.productos[obj])
  } else {
    this.toastSrv.error("No se encontro el producto buscado..",'Pedir producto');
   alert("No se encontro el producto buscado..");
  }*/
}


}
