import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
/**adfadsfadsf*/
  NOMBRE: any;
  NOMBRE2: any;
  CORREO: any;
  FECHA: any;
  PAIS: any;
  FOTO: any;
  NUEVAFOTO: any;
  CONTRASENA: any;
  CONTRASENA2: any;
  CREDITOS: any;
  private image: ImageSelected = null;
  constructor(public servicio: ServiciologinService, public router: Router, public http: HttpClient) { }
 
  onUploadFinish(event){
    console.log(event);
    this.image = new ImageSelected;
    this.image.image = event.src;
    this.image.name = event.file.name;
  }

  sendImage(){
    if(this.image != null){
      const fechaFormar = new Date();
      const fe = "imagen" + fechaFormar.getDay()+fechaFormar.getMonth()+fechaFormar.getFullYear() + fechaFormar.getHours() + fechaFormar.getMinutes()+fechaFormar.getMilliseconds() + ".png";
      this.NUEVAFOTO = fe;
      console.log(this.NUEVAFOTO);
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

  ngOnInit(): void {

    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    this.servicio.refrescarUsuario();
    console.log("Entrando a perfil");
    this.servicio.traerPaises();
    let usr_string = localStorage.getItem('usuarioactual');
    if (!isNullOrUndefined(usr_string)){
      console.log("Entrando al if");
      let user = JSON.parse(usr_string);
      this.NOMBRE = user[1];
      this.NOMBRE2 = user[1];
      this.CORREO = user[2];
      this.PAIS = user[5];
      var str = user[4];
      this.FECHA = str.replace("T06:00:00.000Z","");
      console.log(this.FECHA);
      this.CREDITOS = user[7];
      this.FOTO = "http://localhost:3010/" + user[6];
    }else{
      console.log("Undefinied");
    }
  }

  actualizar(){
    console.log("actualizar");
    let usr_string = localStorage.getItem('usuarioactual');
    if (!isNullOrUndefined(usr_string)){
      let user = JSON.parse(usr_string);
      //nombre se queda como nombre 
      if(this.NOMBRE2 == ""){
        alert("El nombre no puede quedar vacio");
      }else{
        if(this.FECHA == ""){
          alert("La fecha de nacimiento no es valida");
        }else{
          if(this.NUEVAFOTO == null){
            var str = this.FOTO;
            var NEWFOTO = str.replace("http://localhost:3010/","");
          }else{
            var NEWFOTO = this.NUEVAFOTO;
          }
          
          
          if(this.CONTRASENA != null){
            if(this.CONTRASENA == this.CONTRASENA2){
              //si esta correcta la contra
              this.servicio.actualizarUsuario({
                'nombre': this.NOMBRE2, 
                'contrasena': this.CONTRASENA,
                'fecha': this.FECHA,
                'pais': this.PAIS,
                'foto': NEWFOTO,
                'usuario': user[0],
                'cont': 1
              });
            }else{
              //no esta correcta la confirmacion
              alert("Las contrasenas ingresadas no coinciden");
            }
          }else{
            console.log("llega");
            //jalar la contra del usuario
            var password = user[3];
            this.servicio.actualizarUsuario({
              'nombre': this.NOMBRE2, 
              'contrasena': password,
              'fecha': this.FECHA,
              'pais': this.PAIS,
              'foto': NEWFOTO,
              'usuario': user[0],
              'cont': 0
            });
          }
        }
      }

    }else{
      console.log("Undefinied");
    }
  }
 
}

class ImageSelected{
  public name: String;
  public image: String;
}