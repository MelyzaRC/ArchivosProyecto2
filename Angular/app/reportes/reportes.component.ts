import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnsubscriptionError } from 'rxjs';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  REPORTE: any;
  REPORTESELECCIONADO: any;

  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    this.REPORTE = 0;
    this.REPORTESELECCIONADO = '1';
  }

  verBitacoraASC(){
    this.servicio.verBitacora2();
  }

  verBitacoraDESC(){
    this.servicio.verBitacora();
  }

  verDiezMasVendidos(){
    this.servicio.verDiezMasVendidos();
  }

  verDiezMasMegusta(){
    this.servicio.verDiezMasMegusta();
  }

  verDiezMasNoMegusta(){
    this.servicio.verDiezMasNoMegusta();
  }

  verDiezClientesCreditos(){
    this.servicio.verDiezClientesCreditos();
  }

  verDiezClientesCreditosMenos(){
    this.servicio.verDiezClientesCreditosMenos();
  }


  verDiezClientesMasDenuncias(){
    this.servicio.verDiezClientesDenuncias();
  }

  verDiezClientesMasProductos(){
    this.servicio.verDiezClientesProductos();
  }

  verPaisesReporte(){
    this.servicio.verPaisesReporte();
  }

  verReporte(){
    this.servicio.setReporte(this.REPORTESELECCIONADO);
    switch(this.REPORTESELECCIONADO){
      case '1':
        console.log("reporte1");
        this.servicio.verBitacora();
        this.REPORTE = this.REPORTESELECCIONADO
        break;
      case '2':
        console.log("reporte2");
        this.verDiezMasVendidos();
        this.REPORTE = this.REPORTESELECCIONADO
        break;
      case '3':
        console.log("reporte3");
        this.verDiezMasMegusta();
        this.REPORTE = this.REPORTESELECCIONADO
        break;
      case '4':
        console.log("reporte4");
        this.verDiezMasNoMegusta();
        this.REPORTE = this.REPORTESELECCIONADO
        break;
      case '5':
        console.log("reporte5");
        this.verDiezClientesCreditos();
        this.verDiezClientesCreditosMenos();
        this.REPORTE = this.REPORTESELECCIONADO
        break;
      case '6':
        console.log("reporte6"); 
        this.verDiezClientesMasDenuncias();
        this.REPORTE = this.REPORTESELECCIONADO
        break;
      case '7':
        console.log("reporte7");
        this.verDiezClientesMasProductos();
        this.REPORTE = this.REPORTESELECCIONADO
        break;
      case '8':
        console.log("reporte8");
        this.verPaisesReporte();
        this.REPORTE = this.REPORTESELECCIONADO
        break;
      default:
        console.log(this.REPORTESELECCIONADO);
        console.log("No se reconoce el reporte");
    }
  }

}
