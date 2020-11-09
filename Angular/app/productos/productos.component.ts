import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';
import { isNullOrUndefined } from 'util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  PRESENTAR: any;
  public BUSQUEDA: any;
  public BUSQUEDA2: any;
  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    let usr_string = localStorage.getItem('usuarioactual');
    if (!isNullOrUndefined(usr_string)){
      console.log("Entrando al if");
      let user = JSON.parse(usr_string);
      this.servicio.traerProductos(user[0]);
      this.servicio.traerCategorias();
      this.PRESENTAR = 1;
    }
  }

  buscarProductos(){
    if(this.BUSQUEDA == null){
      alert('Debe ingresar el criterio de busqueda');
    }else{
      this.PRESENTAR = 1;
      this.servicio.productos = null;
      this.servicio.CRITERIO = this.BUSQUEDA;
      this.servicio.buscarProductos(this.BUSQUEDA);
    }
  }

  buscarProductosCategoria(){
    if(this.BUSQUEDA2 == null){
      alert('Debe ingresar la categoria a buscar');
    }else{
      this.PRESENTAR = 2;
      this.servicio.productosCategoria = null;
      this.servicio.traerProductosCategoria(this.BUSQUEDA2);
    }
  }

  buscarProductosMayor(){
    this.PRESENTAR = 3;
      this.servicio.productos = null;
      this.servicio.traerProductosmayor();
  }

  buscarProductosMenor(){
    this.PRESENTAR = 4;
      this.servicio.productos = null;
      this.servicio.traerProductosmenor();
  }
  

  verTodos(){
    this.PRESENTAR = 1
    this.servicio.traerProductos(this.servicio.getCurrentUsert()[0]);
  }

  verDetalles(producto: any){
    this.servicio.codigoProductoActual = producto;
    this.servicio.traerProducto();
  }

}
