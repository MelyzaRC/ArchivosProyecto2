import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-resbusqueda',
  templateUrl: './resbusqueda.component.html',
  styleUrls: ['./resbusqueda.component.css']
})
export class ResbusquedaComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  public CRITERIO : any;
  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    if(this.servicio.CRITERIO == null){
      this.router.navigateByUrl('productos');
    }
    this.CRITERIO = this.servicio.CRITERIO;
    this.servicio.CRITERIO = null;
  }

  verDetalles(producto: any){
    this.servicio.codigoProductoActual = producto;
    this.servicio.traerProducto();
  }

}
