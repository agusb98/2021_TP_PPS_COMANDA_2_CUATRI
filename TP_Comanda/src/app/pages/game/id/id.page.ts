import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { AuthService } from 'src/app/services/auth.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-id-game',
  templateUrl: './id.page.html',
  styleUrls: ['./id.page.scss'],
})

export class IdPage implements OnInit {

  srcBase: string = "../../../../assets/juegos/";
  srcPiedra: string = this.srcBase + "piedra.jpg";
  srcPapel: string = this.srcBase + "papel.jpg";
  srcTijera: string = this.srcBase + "tijera.jpg";
  srcIncognita: string;
  srcResultado: string;
  bloquear: boolean;
  triunfos: number = 0;
  derrotas: number = 0;
  empates: number = 0;
  userName: string;
  juegoIniciado: boolean = false;
  doc_id: any;
  currentUid: string;
  mesasCliente: any;
  currentMesaCliente: any;
  pedido$: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public toastSrv: ToastrService,
    public pedidosSrv: PedidoService,
    public pedidoSrv: PedidoService,
    public authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPedido();
    this.setInitialStatus();
  }

  getPedido() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pedido$ = this.pedidoSrv.getById(id);
  }

  chose(id: number, pedido: Pedido) {
    if (!this.bloquear) {
      this.executeLogic(id, pedido);
    }
  }

  executeLogic(id: number, pedido: Pedido) {
    this.bloquear = true;
    let seconds = 2;
    let maquina = this.getRandomInt(1, 3);

    switch (maquina) {
      case 1:
        this.srcIncognita = this.srcPiedra;
        break;
      case 2:
        this.srcIncognita = this.srcPapel;
        break;
      case 3:
        this.srcIncognita = this.srcTijera;
        break;
    }

    let resultado: number = this.getResultado(id, maquina);

    switch (resultado) {
      case 0:
        this.empates++;
        seconds = 1;
        this.srcResultado = "";
        break;
      case 1:
        this.triunfos++;
        this.srcResultado = this.srcBase + "ganar.jpg";
        break;
      case 2:
        this.derrotas++;
        this.srcResultado = this.srcBase + "perder.jpg";
        break;
    }

    if (this.derrotas >= 3) {
      this.toastr.error("La maquina ganó, no hay descuento", "Resultado Final");
      pedido.descuento = 'PERDIO';
      this.pedidosSrv.setOne(pedido);
      this.redirectTo('home');
    }
    else if (this.triunfos >= 3) {
      pedido.date_updated = new Date().getTime();
      pedido.descuento = 'GANO';

      this.pedidosSrv.setOne(pedido);
      this.toastr.success("!Ganaste! Se te aplicara un 10% de descuento", "Resultado Final")
      this.redirectTo('home');
    }

    this.waitTime(seconds);
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  getResultado(humano: number, maquina: number): number {
    if (humano != maquina) {
      this.juegoIniciado = true;
    }
    if (humano == maquina) {
      return 0;
    }
    if (humano == 1 && maquina == 3) {
      return 1;
    }
    else if (humano == 2 && maquina == 1) {
      return 1;
    }
    else if (humano == 3 && maquina == 2) {
      return 1;
    }
    else {
      return 2;
    }
  }

  getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setInitialStatus() {
    this.bloquear = false;
    this.srcIncognita = this.srcBase + "incognita.jpg";
    this.srcResultado = "";
  }

  waitTime(seconds: number) {
    setTimeout(() => {
      this.setInitialStatus();
    }, seconds * 1000);
  }
}
