import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciologinService } from '../serviciologin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  NOMBRE: any;
  DETALLE: any;
  PRECIO: any;
  CATEGORIA: any;
  ETIQUETA: any;
  FOTO: any;

  private image: ImageSelected = null;
  constructor(public servicio: ServiciologinService, public router: Router, public http: HttpClient) { }

  ngOnInit(): void {
    if(this.servicio.getCurrentUsert() == false){
      this.router.navigateByUrl('error');
    }
    this.servicio.categorias = null;
    this.servicio.traerCategorias();
  }

  registrarProducto(){
    console.log("registrando producto");
    if(this.NOMBRE != null){
      this.servicio.registrarProducto({
        'nombre' : this.NOMBRE,
        'detalle' : this.DETALLE,
        'palabras_clave' : this.ETIQUETA,
        'precio' : this.PRECIO,
        'categoria' : this.CATEGORIA,
        'foto': this.FOTO
      });
    }else{
      alert('Debe ingresar todos los datos del producto');
    }
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


}

class ImageSelected{
  public name: String;
  public image: String;
}