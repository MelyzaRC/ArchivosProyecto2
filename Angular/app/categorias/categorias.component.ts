import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public CATEGORIA: any;
  constructor(public servicio: ServiciologinService, public router: Router) { }

  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    this.servicio.traerCategorias();
  }

  insertarCategoria(){
    if(this.CATEGORIA != null){
      this.servicio.nuevaCategoria(this.CATEGORIA);
    }else{
      alert('Debe ingresar el nombre de la nueva categoria');
    }
  }

}
