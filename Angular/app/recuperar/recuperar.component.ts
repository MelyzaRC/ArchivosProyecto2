import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  CORREO: any;
  constructor(public servicio: ServiciologinService, public router: Router) { }

  ngOnInit(): void {
  }

  recuperar(){
    if(this.CORREO == null){
      this.servicio.notificacionError("Debe ingresar su correo", "Error");
    }else if (this.CORREO == ""){
      this.servicio.notificacionError("Debe ingresar su correo", "Error");
    }else{
      this.servicio.recuperarContrasena(this.CORREO);
    }
  }

  
}
