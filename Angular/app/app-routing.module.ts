import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductosComponent } from './productos/productos.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { LogoutComponent } from './logout/logout.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { ErrorPaginaComponent } from './error-pagina/error-pagina.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ResbusquedaComponent } from './resbusqueda/resbusqueda.component';
import { ProductoactualComponent } from './productoactual/productoactual.component';
import { ImageUploadModule } from 'angular2-image-upload';
import { DenunciarproductoComponent } from './denunciarproducto/denunciarproducto.component';
import { ConfirmarcuentaComponent } from './confirmarcuenta/confirmarcuenta.component';
import { CarritoComponent } from './carrito/carrito.component';
import { RecuperarnuevaComponent } from './recuperarnueva/recuperarnueva.component';
import { MisproductosComponent } from './misproductos/misproductos.component';

const routes: Routes = [
  
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'tarjeta', component: TarjetaComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'productos', component: ProductosComponent},
  {path:'nuevo', component: NuevoComponent},
  {path:'logout', component: LogoutComponent},
  {path:'mensaje', component: MensajeComponent},
  {path:'error', component: ErrorPaginaComponent},
  {path:'recuperar', component: RecuperarComponent},
  {path:'denuncias', component: DenunciasComponent},
  {path:'reportes', component: ReportesComponent},
  {path:'categorias', component: CategoriasComponent},
  {path:'resbusqueda', component: ResbusquedaComponent},
  {path:'productoactual', component: ProductoactualComponent},
  {path:'denunciarproducto', component: DenunciarproductoComponent},
  {path:'confirmarcuenta/:correo', component: ConfirmarcuentaComponent},
  {path:'carrito', component: CarritoComponent},
  {path:'recuperarnueva/:correo', component: RecuperarnuevaComponent},
  {path:'misproductos', component: MisproductosComponent},
  {path:'**', component: TarjetaComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ImageUploadModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
