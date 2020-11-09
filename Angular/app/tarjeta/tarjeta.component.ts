import { AnimationFactory } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ServiciologinService } from '../serviciologin.service';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  FOTO: any;
  constructor(private servicio: ServiciologinService, public router: Router) { 
  }

  public actual: any;
  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    console.log("Entrando a tarjeta");
    let usr_string = localStorage.getItem('usuarioactual');
    if (!isNullOrUndefined(usr_string)){
      console.log("Entrando al if");
      
      let user = JSON.parse(usr_string);
      if(user[9]==0){
        alert('Aun no ha confirmado su cuenta, revise su correo electronico.');
        this.servicio.removeUser();
        this.router.navigateByUrl('login');
      }
      this.actual = user;
      this.FOTO = "http://localhost:3010/" + user[6];
      console.log(this.actual);
    }else{
      console.log("Undefinied");
    }
    console.log("Saliendo de oninit");
  }

  public irCliente(){
    this.router.navigateByUrl('perfil')
  }

  public irAdmin(){
    this.router.navigateByUrl('categorias')
  }

}
