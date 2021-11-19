import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-list-mesa',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  tables$: Observable<any>;

  kyndSelected;
  kynds = [
    { val: 'Comúnes', img: 'assets/images/default.png' },
    { val: 'VIPs', img: 'assets/images/default.png' },
    { val: 'Discapacitados', img: 'assets/images/default.png' },
  ];


  constructor(
    private mesaService: MesaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.kyndSelected = this.kynds[0];
    this.getTables(this.kyndSelected.val);
  }

  setFilter(p) {
    this.kyndSelected = p;
    this.getTables(p.val);
  }

  getTables(filter: string) {
    switch (filter) {
      case 'Discapacitados':
        this.tables$ = this.mesaService.getDiscapacitados();
        break;

      case 'VIPs':
        this.tables$ = this.mesaService.getVips();
        break;

      default:
        this.tables$ = this.mesaService.getComunes();
        break;
    }
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  setStatus($event, user) {
    user.estado = $event.target.value;
    this.mesaService.setOne(user);
  }

}
