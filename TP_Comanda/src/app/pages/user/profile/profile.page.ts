import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;

  constructor(private router: Router) { }

  ngOnInit() { this.user = JSON.parse(localStorage.getItem('user')); }

  redirectTo(path: string) { this.router.navigate([path]); }
}
