import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    public navCtrl: NavController    
    ) { }

  ngOnInit() {
    console.log(this.db.getAllEncuesta());
  }

  navigateBack(){
    this.navCtrl.back();
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

}
