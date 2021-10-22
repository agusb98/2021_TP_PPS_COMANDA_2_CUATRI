import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  user$;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user$ = JSON.parse(localStorage.getItem('user'));
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy() {
    this.user$ = null;
  }
}
