import { Component, OnInit } from '@angular/core';
import { ServiciologinService } from '../serviciologin.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperarnueva',
  templateUrl: './recuperarnueva.component.html',
  styleUrls: ['./recuperarnueva.component.css']
})
export class RecuperarnuevaComponent implements OnInit {

  EMAIL: any;
  PASSWORD1: any;
  PASSWORD2: any;
  constructor(public servicio: ServiciologinService, public router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.EMAIL = this.rutaActiva.snapshot.params.correo;
  }

  recuperar(){
    if(this.PASSWORD1 != null && this.PASSWORD2 != null){
      if(this.PASSWORD1 != "" && this.PASSWORD2 != null){
        if(this.EMAIL != null && this.EMAIL != ""){
          this.servicio.contrasenaRecuperada(this.EMAIL, this.PASSWORD1);
        }else{
          this.servicio.notificacionError("Error en el correo", "Error");
        }
      }else{
        this.servicio.notificacionError("Error en la nueva contrasena", "Error");
      }
    }else{
      this.servicio.notificacionError("Error en la nueva contrasena", "Error");
    }
  }

}
