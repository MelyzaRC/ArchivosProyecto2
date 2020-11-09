import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  public BUSQUEDA: any;
  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    let usr_string = localStorage.getItem('usuarioactual');
    if (!isNullOrUndefined(usr_string)){
      console.log("Entrando al if");
      let user = JSON.parse(usr_string);
      this.servicio.traerProductos(user[0]);
    }
  }

  buscarProductos(){
    if(this.BUSQUEDA == null){
      alert('Debe ingresar el criterio de busqueda');
    }else{
      this.servicio.productos = null;
      this.servicio.CRITERIO = this.BUSQUEDA;
      this.servicio.buscarProductos(this.BUSQUEDA);
    }
  }


  verDetalles(producto: any){
    this.servicio.codigoProductoActual = producto;
    this.servicio.traerProducto();
  }

}
