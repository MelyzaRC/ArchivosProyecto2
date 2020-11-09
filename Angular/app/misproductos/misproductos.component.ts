import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent implements OnInit {

  constructor(public servicio: ServiciologinService, public router: Router) { }

  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    let usr_string = localStorage.getItem('usuarioactual');
    if (!isNullOrUndefined(usr_string)){
      let user = JSON.parse(usr_string);
      this.servicio.traerMisProductos(user[0]);
    }
  }

}
