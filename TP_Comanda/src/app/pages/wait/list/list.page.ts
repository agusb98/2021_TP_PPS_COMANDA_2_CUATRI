import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { WaitList } from 'src/app/models/waitList';
import { WaitListService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-list-wait',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  waits$: Observable<any>;

  kyndSelected;
  kynds = [
    { val: 'Activos', img: 'assets/images/default.png' },
    { val: 'Inactivos', img: 'assets/images/default.png' },
    { val: 'Usados', img: 'assets/images/default.png' },
  ];


  constructor(
    private waitService: WaitListService,
    private router: Router, 
    public navCtrl: NavController  
  ) { }
 
 
  navigateBack(){
    this.navCtrl.back();
  }


  ngOnInit() {
    this.kyndSelected = this.kynds[0];
    this.getList(this.kyndSelected.val);
  }

  setFilter(p) {
    this.kyndSelected = p;
    this.getList(p.val);
  }

  getList(filter: string) {
    switch (filter) {
      case 'Usados':
        this.waits$ = this.waitService.getUsados();
        break;

      case 'Inactivos':
        this.waits$ = this.waitService.getInactivos();
        break;

      default:
        this.waits$ = this.waitService.getPendientes();
        break;
    }
  }

  setStatus(model: WaitList){
    
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

}
