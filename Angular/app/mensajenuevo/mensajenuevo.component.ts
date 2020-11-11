import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-mensajenuevo',
  templateUrl: './mensajenuevo.component.html',
  styleUrls: ['./mensajenuevo.component.css']
})
export class MensajenuevoComponent implements OnInit {

  propietarioAqui: any;
  CONTENIDO: any;
  constructor(public servicio: ServiciologinService, public router: Router) { }

  ngOnInit(): void {
    this.servicio.propietario = this.servicio.getCurrentPropietario();
    this.propietarioAqui = this.servicio.getCurrentPropietario();
    this.servicio.obtenerConversacion();
  }

  enviar(){
    if(this.CONTENIDO != null){
      if(this.CONTENIDO != ""){
        this.servicio.enviarNuevoMensaje(this.CONTENIDO);
        this.CONTENIDO = "";
      }
    }
  }

}
