import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestorageService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-grafico-cliente',
  templateUrl: './grafico-cliente.page.html',
  styleUrls: ['./grafico-cliente.page.scss'],
})
export class GraficoClientePage implements OnInit {

  constructor(
    private router: Router,
    private db:FirestorageService, 
    ) { }

  ngOnInit() {
    console.log(this.db.getAllEncuesta());
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

}
