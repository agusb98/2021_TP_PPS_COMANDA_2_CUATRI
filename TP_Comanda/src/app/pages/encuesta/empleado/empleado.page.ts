import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
})
export class EmpleadoPage implements OnInit {

  constructor(
    private router: Router,
    ) { }

  ngOnInit() {
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

}
