import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-denunciarproducto',
  templateUrl: './denunciarproducto.component.html',
  styleUrls: ['./denunciarproducto.component.css']
})
export class DenunciarproductoComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  CONTENIDO: any;

  public productoActual: any;
  public actualAqui: any;

  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    this.actualAqui = this.servicio.getCurrentUsert();
    this.actualAqui[6] =  "http://localhost:3010/" + this.actualAqui[6];
    this.productoActual = this.servicio.getCurrentProducto();
    this.productoActual[7] = "http://localhost:3010/"+this.productoActual[7]
  }

  realizarDenuncia(){
    console.log(this.actualAqui[0]);
    console.log(this.productoActual[0]);
    console.log(this.CONTENIDO);
    if(this.CONTENIDO != ""){
      this.servicio.denunciarProducto(this.productoActual[0], this.actualAqui[0], this.CONTENIDO);
    }else{
      alert("Debe ingresar el motivo de su denuncia");
    }
    
  }
}
