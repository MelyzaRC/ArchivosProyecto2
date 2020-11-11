import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-productoactual',
  templateUrl: './productoactual.component.html',
  styleUrls: ['./productoactual.component.css']
})


export class ProductoactualComponent implements OnInit {

  CONTENIDO: any;
  CANTIDAD: any;

  public productoActual: any;
  constructor(public servicio: ServiciologinService, public router: Router, public http: HttpClient) { }

  public actualAqui: any;
  ngOnInit(): void {
    console.log("entra");
    this.actualAqui = this.servicio.getCurrentUsert();
    this.actualAqui[6] =  "http://localhost:3010/" + this.actualAqui[6];
    this.productoActual = this.servicio.getCurrentProducto();
    this.productoActual[7] = "http://localhost:3010/"+this.productoActual[7]
    this.servicio.verLike();
    this.servicio.verComentarios();
    console.log(this.servicio.estadoLike);
  }

  darLike(estado: any){
    this.servicio.darLike(estado);
  }

  comentar(){
    if(this.CONTENIDO == null){
      alert("Debe ingresar un texto en su comentario");
    }else{
      this.servicio.comentar(this.CONTENIDO);
    }
  }

  denunciar(){
    this.router.navigateByUrl('denunciarproducto');
  }

  enviarMensaje(){
    this.servicio.obtenerPropietario(this.productoActual[6])
  }

  anadirCarrito(){
    if(this.CANTIDAD == null){
      alert('debe indicar una cantidad');
    }else if(this.CANTIDAD == 0){
      alert('debe indicar una cantidad valida');
    }else{  
      this.servicio.anadirCarrito(this.productoActual[0], this.actualAqui[0], this.CANTIDAD)
    }
  }

}
