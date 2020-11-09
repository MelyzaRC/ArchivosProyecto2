import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    if(this.servicio.getCurrentUsert()[8] != 1){
      alert('Pagina solo para admins')
      this.router.navigateByUrl('perfil');
    }
    this.servicio.verDenuncias();
  }

  eliminarProducto(producto: any, denuncia: any){
    this.servicio.aceptarDenuncia(denuncia, producto);
  }

  denegarDenuncia(denuncia: any){
    this.servicio.denegarDenuncia(denuncia);
  }
}
