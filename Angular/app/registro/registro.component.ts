import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  NOMBRE: any;
  CORREO: any;
  PASSWORD: any;
  PASSWORD2: any;
  FECHA: any;
  PAIS: any;
  FOTO: any;
  CREDITOS: 10000;
  TIPO: 1;

  private image: ImageSelected = null;
  constructor( public servicio: ServiciologinService, private router: Router, public http: HttpClient) { }

  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() != false){
      this.router.navigateByUrl('perfil');
    }
    this.servicio.traerPaises();
  }

  onUploadFinish(event){
    console.log(event);
    this.image = new ImageSelected;
    this.image.image = event.src;
    this.image.name = event.file.name;
  }
  
  sendImage(){
    if(this.image != null){
      const fechaFormar = new Date();
      const fe = "imagen" + fechaFormar.getDay()+fechaFormar.getMonth()+fechaFormar.getFullYear() + fechaFormar.getHours() + fechaFormar.getMinutes()+fechaFormar.getMilliseconds() + ".jpg";
      this.FOTO = fe;
      console.log(this.FOTO);
      console.log("send image");
      this.http.post(`${this.servicio.API_URI}upload`, {
        file: this.image.image,
        name: fe
      }).subscribe((d) =>{
        console.log(d);
        if(d == 1){
          this.servicio.notificacionSuccess("Foto aceptada", "Ok");
        }
      })
    }
  }

  resetCampos(){
    this.NOMBRE = "";
    this.CORREO = "";
    this.PASSWORD = "";
    this.PASSWORD2 = "";
    this.FECHA = "";
    this.PAIS = "";
    this.FOTO = "";
  }
  public newFoto: any;
  registrarse():void{
    if(this.FOTO == null){
      this.FOTO = "default.png";
    }
    //verificando que los datos esten completos
    if(this.NOMBRE != null && this.CORREO != null && this.PASSWORD != null && this.PASSWORD2 != null && this.FECHA != null && this.FOTO != null && this.FECHA != null){
      //verificando que las constrasenas coincidan
      if(this.PASSWORD == this.PASSWORD2){
        this.servicio.registro({
          'usuario': 0,
          'nombre': this.NOMBRE,
          'correo': this.CORREO,
          'password': this.PASSWORD,
          'fecha': this.FECHA,
          'pais': this.PAIS,
          'foto': this.FOTO,
          'creditos': 10000,
          'tipo':2,
          'estado':0
      });
        //this.resetCampos();
      }else{
        alert('Las contrasenas no coinciden');
      }
    }else{
      alert('Debe completar todos los datos para poder registrarse.');
    }
  }


}



class ImageSelected{
  public name: String;
  public image: String;
}