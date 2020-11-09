import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiciologinService } from '../serviciologin.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  usuarioActual : any;
  CANTIDAD: any;
  constructor(public servicio: ServiciologinService, public router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.usuarioActual = this.servicio.getCurrentUsert();
    if(this.usuarioActual == false){
      this.router.navigateByUrl('error');
    }
    this.servicio.verCarrito(this.usuarioActual[0]);
    
  }
  


  quitarProducto(item: any){
    this.servicio.quitarCarrito(item);
  }

  realizarCompra(){
    if(this.servicio.carrito.length == 0){
      this.servicio.notificacionError("el carrito esta vacio","Error");
    }else{
      this.servicio.confirmarCompra(this.usuarioActual[0]);
    }
  }
  
  vaciarCarrito(){
    if(this.servicio.carrito.length == 0){
      this.servicio.notificacionInfo("El carrito se encuentra vacio", "Info")
    }else{
      this.servicio.vaciarCarrito();
    }
  }

}
