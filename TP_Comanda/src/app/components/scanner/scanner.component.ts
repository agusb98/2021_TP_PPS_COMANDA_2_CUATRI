import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WaitList } from 'src/app/models/waitList';
import { WaitListService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html'
})

export class ScannerComponent implements OnInit {
  public user;
  public hasWait;

  constructor(
    private toastr: ToastrService,
    private waitService: WaitListService,
  ) { }

  ngOnInit() {
    this.user = null;
    this.getUser();

    this.hasWait = false;
    this.checkWait();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private checkWait() {
    this.waitService.getByUser(this.user.correo, 'PENDIENTE').subscribe(data => {
      if (data) { this.hasWait = true; }
      else { this.hasWait = false; }
    })

    if (this.hasWait == false) {
      this.waitService.getByUser(this.user.correo, 'EN USO').subscribe(data => {
        if (data) { this.hasWait = true; }
      })
    }
  }

  scannQR(){
    this.addToWaitList();
  }

  private addToWaitList() {
    try {
      if (this.hasWait == false) {
        const m = this.createModelWait();
        this.waitService.createOne(m);

        this.hasWait = true;
        this.toastr.success('Aguarde un instante, en breves se le asignará una mesa!', 'Lista de Espera');
      }
      else { this.toastr.error('Previamente usted ya solicitó una mesa', 'Lista de espera') }
    }
    catch (error) { this.toastr.error('Error al momento de ingresarlo en lista de espera', 'Lista de espera'); }
  }

  private createModelWait() {
    let m: WaitList = {
      id: '',
      estado: 'PENDIENTE',
      correo: this.user.correo,
      date_created: new Date().getTime()
    }

    return m;
  }

}
