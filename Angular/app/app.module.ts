import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { RegistroComponent } from './registro/registro.component';
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
import { BitacoraComponent } from './bitacora/bitacora.component';
import { ImageUploadModule } from 'angular2-image-upload';
import { DenunciarproductoComponent } from './denunciarproducto/denunciarproducto.component';
import { ConfirmarcuentaComponent } from './confirmarcuenta/confirmarcuenta.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { RecuperarnuevaComponent } from './recuperarnueva/recuperarnueva.component';
import { MisproductosComponent } from './misproductos/misproductos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TarjetaComponent,
    RegistroComponent,
    PerfilComponent,
    ProductosComponent,
    NuevoComponent,
    LogoutComponent,
    MensajeComponent,
    ErrorPaginaComponent,
    RecuperarComponent,
    DenunciasComponent,
    ReportesComponent,
    CategoriasComponent,
    ResbusquedaComponent,
    ProductoactualComponent,
    BitacoraComponent,
    DenunciarproductoComponent,
    ConfirmarcuentaComponent,
    CarritoComponent,
    RecuperarnuevaComponent,
    MisproductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
