import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-error-pagina',
  templateUrl: './error-pagina.component.html',
  styleUrls: ['./error-pagina.component.css']
})
export class ErrorPaginaComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  ngOnInit(): void {
  }
  irALogin(){
    this.router.navigateByUrl('login');
  }

}
