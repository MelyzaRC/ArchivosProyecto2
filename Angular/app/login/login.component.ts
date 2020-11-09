import { Component, Input, OnInit } from '@angular/core';
import { ServiciologinService } from '../serviciologin.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public EMAIL: any;
  public PASSWORD: any;
  constructor(public servicio: ServiciologinService, public router: Router) { 

  }

  ngOnInit(): void {
    //si el usuario esta logueado lo manda a su perfil
    if(this.servicio.getCurrentUsert() != false){
      this.router.navigateByUrl('perfil');
    }
  }

  onResetForm(){
  }

  onSaveForm(){
    this.servicio.loginUsuario({'email': this.EMAIL, 'password':this.PASSWORD});
  }

  irARecuperar(){
    this.router.navigateByUrl('recuperar');
  }

}