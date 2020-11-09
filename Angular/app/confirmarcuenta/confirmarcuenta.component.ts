import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-confirmarcuenta',
  templateUrl: './confirmarcuenta.component.html',
  styleUrls: ['./confirmarcuenta.component.css']
})
export class ConfirmarcuentaComponent implements OnInit {

  EMAIL: any;
  constructor(public servicio: ServiciologinService, public router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.EMAIL = this.rutaActiva.snapshot.params.correo;
  }

  confirmar(){
    if(this.EMAIL != null){
      if(this.EMAIL != ""){
        this.servicio.confirmarCuenta({
          'email': this.EMAIL
        })
      }else{
        this.servicio.notificacionError("Error en correo a confirmar", "Error");
      }
    }else{
      this.servicio.notificacionError("Error en correo a confirmar", "Error");
    }
  }


}
