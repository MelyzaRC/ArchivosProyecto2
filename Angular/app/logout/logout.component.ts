import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    this.servicio.removeUser();
  }

  irALogin(){
    this.router.navigateByUrl('login');
  }

}
