import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ServiciologinService {

  API_URI = 'http://localhost:3000/'
  public CRITERIO: any;

  constructor(private http: HttpClient, private router: Router,private toast: ToastrService) {
  }

  public info = "";
  public actual: any;
  public metodo(email: string, password: string){
    console.log(email);
    console.log(password);
    this.info = "ok";
  }

  /*LOGIN*/
  public usuarios: any[] = [];
  public loginUsuario(dato: any){
    this.removeUser();
    this.http.get(`${this.API_URI}login?email=${dato.email}&password=${dato.password}`)
    .subscribe((resp: any[]) => {
      this.usuarios = resp;
      console.log(this.usuarios);
      if(this.usuarios.length > 0){
        
        this.actual = this.usuarios[0];
        if(this.actual[9] == 0){
          this.notificacionError('Aun no ha confirmado su cuenta, revise su correo electronico', "Error");
         //location.reload();
        }else{
          this.notificacionSuccess("Usuario logueado","OK");
          this.setUser(this.actual);
          this.router.navigateByUrl('tarjeta')
          this.guardarBitacora(`Acceso al sistema`, dato.email);
        }
        
      }else{
        this.notificacionError("Error de credenciales","Error");
      }
    });
  }

  public confirmarCuenta(dato: any){
    this.removeUser();
    this.http.get(`${this.API_URI}confirmarcuenta?&email=${dato.email}`)
    .subscribe((resp: any) => {
      if(resp == 0){
        this.notificacionError("Error en confirmacion de cuenta", "Error");
      }else{
        this.notificacionSuccess("Cuenta verificada con exito", "Ok");
        this.removeUser();
        this.router.navigateByUrl('login');
      }
    });
    this.guardarBitacora(`Confirmacion de correo`,dato.email);
  }

  /*PAISES PARA QUE EL USUARIO SELECCIONE*/
  public paises: any[];
  public traerPaises(){
    this.http.get(`${this.API_URI}paises`)
    .subscribe((resp: any[]) => {
      this.paises = resp;
      console.log(this.paises)
    });
  }

  /*Ver los productos que no le pertenecen al cliente*/
  public productos: any[];
  public traerProductos(usuario: any){
    this.http.get(`${this.API_URI}productos?&usuario=${usuario}`)
    .subscribe((resp: any[]) => {
      this.productos = resp;
      console.log(this.productos)
      for(var i = 0; i < this.productos.length; i++){
        this.productos[i][7] = "http://localhost:3010/"+this.productos[i][7];
      }
    });
  }

  public traerProductosmayor(){
    this.actual = this.getCurrentUsert();
    this.http.get(`${this.API_URI}busquedamayor?&usuario=${this.actual[0]}`)
    .subscribe((resp: any[]) => {
      this.productos = resp;
      console.log(this.productos)
      for(var i = 0; i < this.productos.length; i++){
        this.productos[i][7] = "http://localhost:3010/"+this.productos[i][7];
      }
    });
  }

  public traerProductosmenor(){
    this.actual = this.getCurrentUsert();
    this.http.get(`${this.API_URI}busquedamenor?&usuario=${this.actual[0]}`)
    .subscribe((resp: any[]) => {
      this.productos = resp;
      console.log(this.productos)
      for(var i = 0; i < this.productos.length; i++){
        this.productos[i][7] = "http://localhost:3010/"+this.productos[i][7];
      }
    });
  }

  public productosCategoria: any[];
  public traerProductosCategoria(categoria: any){
    this.actual = this.getCurrentUsert();
    this.http.get(`${this.API_URI}busquedacategorias?&usuario=${this.actual[0]}&categoria=${categoria}`)
    .subscribe((resp: any[]) => {
      this.productosCategoria = resp;
      console.log(this.productosCategoria)
      for(var i = 0; i < this.productosCategoria.length; i++){
        this.productosCategoria[i][7] = "http://localhost:3010/"+this.productosCategoria[i][7];
      }
    });
  }

  public misproductos: any[];
  public traerMisProductos(usuario: any){
    this.http.get(`${this.API_URI}misproductos?&usuario=${usuario}`)
    .subscribe((resp: any[]) => {
      this.misproductos = resp;
      console.log(this.misproductos)
      for(var i = 0; i < this.misproductos.length; i++){
        this.misproductos[i][7] = "http://localhost:3010/"+this.misproductos[i][7];
      }
    });
  }

  /*REGISTRO DE UN NUEVO USUARIO*/
  public registro(usuario: any){
    console.log(usuario);
    this.http.get(`${this.API_URI}registro?&usuario=${usuario.usuario}&nombre=${usuario.nombre}&email=${usuario.correo}&password=${usuario.password}&fecha=${usuario.fecha}&pais=${usuario.pais}&foto=${usuario.foto}&creditos=${usuario.creditos}&tipo=${usuario.tipo}&estado=${usuario.estado}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == 1){
        const textoCorreo = `<center>
                                <img src="https://www.pngkit.com/png/full/411-4119434_pgina-web-con-carritos-de-compras-online-ecommerce.png"  alt="Logo GTSales MarketPlace" width="300px">
                                <p>Estimado(a):</p>
                                <h1>
                                  <font color="#0B5345"><b>${usuario.nombre}</b></h1></font>
                                <br>
                                Bienvenido a <b>GTSales MarketPlace</b>
                                <br>
                                Su registro esta casi completo, por favor, haga <a href="http://localhost:4200/confirmarcuenta/${usuario.correo}">click aqui</a> para confirmar su cuenta.
                            </center>`;
        this.enviarCorreo(usuario.correo, "Confirmacion de registro", textoCorreo);
        this.notificacionInfo('Registro exitoso, verifique su correo para confirmar su cuenta', "Registro");
        this.guardarBitacora(`Registro de usuario`,usuario.correo);
      }else{
        this.notificacionError('No se ha podido crear el usuario, por favor, verifique sus datos', "Error");
      }
    });
  }

  public enviarCorreo(destinatario: any, asunto: any, texto: any){
    this.http.post(`${this.API_URI}enviarcorreo`,{
      destinatario: destinatario,
      asunto: asunto,
      texto: texto
    })
    .subscribe((resp: any) => {
      console.log(resp);
      this.router.navigateByUrl('login');
    });
  }

  public setUser(user: any){
    let usr_string = JSON.stringify(user);
    localStorage.setItem('usuarioactual', usr_string);
  }

  public getCurrentUsert(){
    let usr_string = localStorage.getItem('usuarioactual');
    if (!isNullOrUndefined(usr_string)){
      let user = JSON.parse(usr_string);
      console.log(user);
      return user;
    }
    return false;
  }

  public removeUser(){
    this.paises = null;
    this.productos = null;
    this.categorias = null;
    localStorage.removeItem('usuarioactual');
  }

  /*VER TODAS LAS CATEGORIAS*/
  public categorias: any[];
  public traerCategorias(){
    this.http.get(`${this.API_URI}categorias`)
    .subscribe((resp: any[]) => {
      this.categorias = resp;
      console.log(this.categorias)
    });
  }

  public nuevaCategoria(categoria: any){
    this.http.get(`${this.API_URI}nuevacategoria?&categoria=${categoria}`)
    .subscribe((resp: any[]) => {
      console.log(resp)
      this.notificacionSuccess("Categoria agregada", "Ok");
      location.reload();
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Registro de categoria ${categoria}`, this.actual[2]);
  }

  public usuarioLogueado: any;
  public criterio: any;
  public buscarProductos(criterio: any){
  this.usuarioLogueado = this.getCurrentUsert();
    this.criterio = criterio;
    this.http.get(`${this.API_URI}busquedaproductos?&criterio=%${criterio}%&usuario=${this.usuarioLogueado[0]}`)
    .subscribe((resp: any[]) => {
      this.productos = resp;
      console.log(resp);
      for(var i = 0; i < this.productos.length; i++){
        this.productos[i][7] = "http://localhost:3010/"+this.productos[i][7];
      }
      //this.router.navigateByUrl('resbusqueda');
    });
  }
  
  public registrarProducto(producto: any){
    this.actual = this.getCurrentUsert();
    this.http.get(`${this.API_URI}nuevoproducto?&nombre=${producto.nombre}&detalle=${producto.detalle}&palabras_clave=${producto.palabras_clave}&precio=${producto.precio}&categoria=${producto.categoria}&usuario=${this.actual[0]}&foto=${producto.foto}`)
    .subscribe((resp: any) => {
      if(resp == 0){
        this.notificacionError("No se ha podido registrar el producto", "Error");
      }else{
        this.notificacionSuccess("Producto registrado", "Ok");
        this.actual = this.getCurrentUsert();
        this.guardarBitacora(`Se ha agregado el producto ${producto.nombre}`, this.actual[2]);
        this.router.navigateByUrl('productos');
      }
    });
  }

  public productoActual: any;
  public codigoProductoActual: any;
  public traerProducto(){
    this.http.get(`${this.API_URI}productoactual?&producto=${this.codigoProductoActual}`)
    .subscribe((resp: any[]) => {
      this.productoActual = resp[0];
      console.log(this.productoActual);
      let prd_string = JSON.stringify(this.productoActual);
      localStorage.setItem('productoactual', prd_string);
      this.router.navigateByUrl('productoactual');
    });
  }

  public estadoLike: any;
  public verLike(){
    console.log("viendo el estado");
    this.actual = this.getCurrentUsert();
    this.productoActual = this.getCurrentProducto();
    this.http.get(`${this.API_URI}verLike?&producto=${this.productoActual[0]}&usuario=${this.actual[0]}`)
    .subscribe((resp: any[]) => {
      if(resp.length == 0){
        this.estadoLike = 0;
      }else{
        if(resp[0][3] == 1){
          this.estadoLike = 1;
        }else if(resp[0][3] == 2){
          this.estadoLike = 2;
        }
      }
      console.log("El estado es ");
      console.log(this.estadoLike);
    });

  }

  public darLike(estado: any){

    this.verLike();
    console.log("Estado qye viene");
    console.log(estado);
    this.actual = this.getCurrentUsert();
    this.productoActual = this.getCurrentProducto();
    if(this.estadoLike == 0){
      //nunca ha dado like
      this.http.get(`${this.API_URI}darlike?&producto=${this.productoActual[0]}&usuario=${this.actual[0]}&estado=${estado}`)
      .subscribe((resp: any[]) => {
        console.log(resp);
        location.reload();
      });
      this.actual = this.getCurrentUsert();
      this.guardarBitacora(`Like o dislike al producto ${this.productoActual[1]}`, this.actual[2]);
    }else if(this.estadoLike == 1){
      //ya dio me gusta
      if(estado == 1){
        this.notificacionInfo("Ya has indicado que te gusta este producto", "Informacion");
      }else if(estado== 2){
        console.log("Entra al no like");
        this.http.get(`${this.API_URI}actualizarlike?&producto=${this.productoActual[0]}&usuario=${this.actual[0]}&estado=${estado}`)
        .subscribe((resp: any[]) => {
          console.log(resp);
          location.reload();
        });
        this.actual = this.getCurrentUsert();
        this.guardarBitacora(`Like o dislike al producto ${this.productoActual[1]}`,this.actual[2]);
      }
      
    }else if(this.estadoLike == 2){
      //ya dio no me gusta
      if(estado == 2){
        this.notificacionInfo("Ya has indicado que no te gusta este producto", "Informacion");
      }else if(estado== 1){
        console.log("Entra al no like");
        this.http.get(`${this.API_URI}actualizarlike?&producto=${this.productoActual[0]}&usuario=${this.actual[0]}&estado=${estado}`)
        .subscribe((resp: any[]) => {
          console.log(resp);
          location.reload();
        });
        this.actual = this.getCurrentUsert();
        this.guardarBitacora(`Like o dislike al producto ${this.productoActual[1]}`, this.actual[2]);
      }
    }
    
    
  }

  public setProducto(producto: any){
    let usr_string = JSON.stringify(producto);
    localStorage.setItem('productoactual', usr_string);
  }

  public getCurrentProducto(){
    let prd_string = localStorage.getItem('productoactual');
    if (!isNullOrUndefined(prd_string)){
      let prd = JSON.parse(prd_string);
      return prd;
    }
    return false;
  }

  public removeProducto(){
    localStorage.removeItem('productoactual');
  }

  /*COMENTARIO*/
  public comentar(contenido: any){
    this.actual = this.getCurrentUsert();
    this.productoActual = this.getCurrentProducto();
    const date1 = new Date();
    const fechaEnviar = date1.getDate() + "-" + date1.getMonth() + "-" + date1.getFullYear();
    this.http.get(`${this.API_URI}comentar?&usuario=${this.actual[0]}&producto=${this.productoActual[0]}&contenido=${contenido}&fecha=${fechaEnviar}`)
    .subscribe((resp: any[]) => {
     console.log(resp);
     location.reload();
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Comentario realizado al producto ${this.productoActual[1]}: ${contenido}`, this.actual[2]);
  }

  public comentarios: any;
  public verComentarios(){
    this.productoActual = this.getCurrentProducto();
    this.http.get(`${this.API_URI}vercomentarios?&producto=${this.productoActual[0]}`)
    .subscribe((resp: any[]) => {
     console.log(resp);
     this.comentarios = resp;
     for(var i=0; i< this.comentarios.length; i++){
       this.comentarios[i][6] = "http://localhost:3010/" + this.comentarios[i][6];
       var str = this.comentarios[i][4];
       var x = str.replace("T06:00:00.000Z","");
       this.comentarios[i][4] = x;
     }
    });
  }

  public actualizarUsuario(info: any){
    console.log("Llega en servicio");
    console.log(info.fecha);
    this.http.get(`${this.API_URI}actualizarusuario?&nombre=${info.nombre}&contrasena=${info.contrasena}&fecha=${info.fecha}&pais=${info.pais}&foto=${info.foto}&usuario=${info.usuario}&cont=${info.cont}`)
    .subscribe((resp: any) => {
     console.log(resp);
     if(resp == 0){
        this.notificacionError("Error al actualizar", "Error");
     }else{
       this.notificacionSuccess("Actualizacion exitosa, inicie sesion para ver los cambios", "Ok");
       this.actual = this.getCurrentUsert();
       this.guardarBitacora(`El usuario ha sido actualizado`, this.actual[2]);
       this.removeUser();
       this.router.navigateByUrl('login');
     }
    });
  }

  public denunciarProducto(producto: any, usuario:any, contenido: any){
    const date1 = new Date();
    const fechaEnviar = date1.getDate() + "-" + date1.getMonth() + "-" + date1.getFullYear();
    this.http.get(`${this.API_URI}denunciar?&usuario=${usuario}&producto=${producto}&contenido=${contenido}&fecha=${fechaEnviar}`)
    .subscribe((resp: any) => {
      if(resp == 0){
        this.notificacionError("Erorr al crear denuncia", "Error")
      }else{
        this.notificacionInfo("Su denuncia ha entrado en revision", "Informacion");
        this.router.navigateByUrl('productos');
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Denuncia realizada al producto ${producto}`, this.actual[2]);
  }

  public denuncias: any;
  public verDenuncias(){
    this.http.get(`${this.API_URI}verdenuncias`)
    .subscribe((resp: any[]) => {
      this.denuncias = resp;
      if(resp.length > 0){
        for(var i = 0; i< resp.length; i++){
          this.denuncias[i][5] = "http://localhost:3010/" + this.denuncias[i][5];
          this.denuncias[i][7] = "http://localhost:3010/" + this.denuncias[i][7];
          var str = this.denuncias[i][10];
          this.denuncias[i][10] = str.replace("T06:00:00.000Z","");
        }
      }
      console.log(this.denuncias);
    });
  }

  public denegarDenuncia(denuncia: any){
    this.http.get(`${this.API_URI}denegardenuncia?&denuncia=${denuncia}`)
    .subscribe((resp: any) => {
      if(resp == 0){
        this.notificacionError("Error al denegar denuncia", "Error");
      }else{
        this.notificacionInfo("Denuncia denegada, el producto no se eliminara", "Informacion");
        this.actual = this.getCurrentUsert();
        this.guardarBitacora(`Se ha denegado la denuncia con el correlativo ${denuncia}`,this.actual[2]);
        location.reload();
      }
    });
    
  }

  public aceptarDenuncia(denuncia: any, producto: any){
    this.http.get(`${this.API_URI}aceptardenuncia?&denuncia=${denuncia}`)
    .subscribe((resp: any) => {
      if(resp == 0){
        this.notificacionError("Error al aceptardenuncia", "Error");
      }else{
        this.cambiarEstadoProducto(producto);   
        this.obtenerVendedor(producto);     
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha aceptado la denuncia con el correlativo ${denuncia}`, this.actual[2]);
    this.guardarBitacora(`Se ha retirado el producto con el codigo ${producto}`,this.actual[2]);
  }

  public obtenerVendedor(producto: any){
    this.http.get(`${this.API_URI}obtenervendedor?&producto=${producto}`)
    .subscribe((resp: any[]) => {
      console.log(resp);
      if(resp.length == 0){
        this.notificacionError("Error en los datos del vendedor", "Error");
      }else{
        //enviar el correo de notificacion 
        var vendedor = resp[0];
        const textoCorreo = `<center>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBIMtVijyOI39eWvlK6uj6MoIYtcXFz2Gh4w&usqp=CAU"  alt="Logo GTSales MarketPlace" width="100px">
                                <p>Estimado(a):</p>
                                <h1>
                                  <font color="#0B5345"><b>${vendedor[0]}</b></h1></font>
                                <br>
                                Le informamos que hemos recibido una denuncia acerca de uno de sus productos.
                                <br><br>
                                <b>Detalles:</b>
                                <br>
                                <br>
                                <table border="0" width="75%">
                                  <tr>
                                    <th bgcolor="#D7BDE2">Codigo</th>
                                    <th bgcolor="#D7BDE2">Nombre</th>
                                    <th bgcolor="#D7BDE2">Detalle</th>
                                    <th bgcolor="#D7BDE2">Precio Unitario</th>
                                  </tr>
                                  <tr>
                                    <td><center>${vendedor[2]}</center></td>
                                    <td><center>${vendedor[3]}</center></td>
                                    <td><center>${vendedor[5]}</center></td>
                                    <td><center>$.${vendedor[4]}</center></td>
                                  </tr>
                                </table>
                                <br><br>
                                Hemos decidido <b>RETIRAR</b> este producto del sitio ya que inclumple <br>con nuestras <b>politicas y normas</b>. <bt>
                                <br><br><hr width="50%">
                            </center>`;
          this.enviarCorreo(vendedor[1], "Producto retirado", textoCorreo);  
          location.reload(); 
      }
    });
  }

  public cambiarEstadoProducto(producto: any){
    this.http.get(`${this.API_URI}cambiarestadop?&producto=${producto}`)
    .subscribe((resp: any) => {
      if(resp == 0){
        this.notificacionError("Error al  cambiar el estado del producto", "Error");
      }else{
        this.notificacionSuccess("Producto retirado", "Ok");
      }
    });
  }

  public setReporte(reporte: any){
    localStorage.setItem('reporte', reporte);
  }

  public getReporte(){
    let prd = localStorage.getItem('reporte');
    if (!isNullOrUndefined(prd)){
      return prd;
    }
    return false;
  }

  /*BITACORA*/
  public guardarBitacora(accion: any, correo: any){
    let date1 : Date = new Date();
    console.log("Fecha " + date1);
    const fechaEnviar = (date1.getDay()+1) + "-" + (date1.getMonth()+1) + "-" + date1.getFullYear();
    console.log("Fecha despues: " + fechaEnviar);
    this.http.get(`${this.API_URI}insertarbitacora?&accion=${accion}&fecha=${fechaEnviar}&correo=${correo}`)
    .subscribe((resp: any) => {
      if(resp == 0){
        console.log("No agregado a la bitacora " + accion)
      }else{
        console.log("Agregado a la bitacora " + accion);
      }
    });
  }
  public REPORTE: any;

  /*VER BITACOR*/
  public respuestaReporte: any=[];
  public verBitacora(){
    this.http.get(`${this.API_URI}verbitacora`)
    .subscribe((resp: any[]) => {
      this.respuestaReporte = resp;
      console.log(this.respuestaReporte);
      if(resp.length >0){
        for(var i = 0; i < resp.length; i++){
          var str = resp[i][2];
          var nuevo = str.replace("T06:00:00.000Z","");
          resp[i][2] = nuevo;
        }
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte de bitacora`, this.actual[2]);
  }

  public verBitacora2(){
    this.http.get(`${this.API_URI}verbitacoraotro`)
    .subscribe((resp: any[]) => {
      this.respuestaReporte = resp;
      console.log(this.respuestaReporte);
      if(resp.length >0){
        for(var i = 0; i < resp.length; i++){
          var str = resp[i][2];
          var nuevo = str.replace("T06:00:00.000Z","");
          resp[i][2] = nuevo;
        }
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte de bitacora`, this.actual[2]);
  }

  public productostop: any;
  public verDiezMasVendidos(){
    this.http.get(`${this.API_URI}diezmasvendidos`)
    .subscribe((resp: any[]) => {
      if(resp.length > 0){
        this.productostop = resp;
        console.log(this.productostop);
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte Top10 Mas vendidos`, this.actual[2]);
  }

  public verDiezMasMegusta(){
    this.http.get(`${this.API_URI}diezmasmegusta`)
    .subscribe((resp: any[]) => {
      if(resp.length > 0){
        this.productostop = resp;
        console.log(this.productostop);
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte Top10 Mas Me gusta`, this.actual[2]);
  }

  public verDiezMasNoMegusta(){
    this.http.get(`${this.API_URI}diezmasnomegusta`)
    .subscribe((resp: any[]) => {
      if(resp.length > 0){
        this.productostop = resp;
        console.log(this.productostop);
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte Top10 Mas No Me gusta`, this.actual[2]);
  }

  public clientestop: any;
  public verDiezClientesCreditos(){
    this.http.get(`${this.API_URI}diezclientescreditos`)
    .subscribe((resp: any[]) => {
      if(resp.length > 0){
        this.clientestop = resp;
        if(resp.length > 0){
          for(var i = 0; i < this.clientestop.length; i ++){
            var str = this.clientestop[i][4];
            var nuevo = str.replace("T06:00:00.000Z","");
            this.clientestop[i][4] = nuevo;
          }
        }
        console.log(this.clientestop);
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte Top10 Clientes con mas y menos me gusta`, this.actual[2]);
  }

  public clientestop2: any;
  public verDiezClientesCreditosMenos(){
    this.http.get(`${this.API_URI}diezclientescreditosmenos`)
    .subscribe((resp: any[]) => {
      if(resp.length > 0){
        this.clientestop2 = resp;
        if(resp.length > 0){
          for(var i = 0; i < this.clientestop2.length; i ++){
            var str = this.clientestop2[i][4];
            var nuevo = str.replace("T06:00:00.000Z","");
            this.clientestop2[i][4] = nuevo;
          }
        }
        console.log(this.clientestop2);
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte Top10 Clientes con mas y menos me gusta`, this.actual[2]);
  }

  public clientesdenuncias: any;
  public verDiezClientesDenuncias(){
    this.http.get(`${this.API_URI}diezmasdenuncias`)
    .subscribe((resp: any[]) => {
      if(resp.length > 0){
        this.clientesdenuncias = resp;
        if(resp.length > 0){
          for(var i = 0; i < this.clientesdenuncias.length; i ++){
            var str = this.clientesdenuncias[i][3];
            var nuevo = str.replace("T06:00:00.000Z","");
            this.clientesdenuncias[i][3] = nuevo;
          }
        }
        console.log(this.clientesdenuncias);
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte Top10 Clientes con mas denuncias realizadas`, this.actual[2]);
  }

  public clientesproductos: any;
  public verDiezClientesProductos(){
    this.http.get(`${this.API_URI}diezmasproducto`)
    .subscribe((resp: any[]) => {
      if(resp.length > 0){
        this.clientesproductos = resp;
        if(resp.length > 0){
          for(var i = 0; i < this.clientesproductos.length; i ++){
            var str = this.clientesproductos[i][4];
            var nuevo = str.replace("T06:00:00.000Z","");
            this.clientesproductos[i][4] = nuevo;
          }
        }
        console.log(this.clientesproductos);
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte Top10 Clientes con mas productos publicados`, this.actual[2]);
  }

  public paisesreporte: any;
  public verPaisesReporte(){
    this.http.get(`${this.API_URI}infopaises`)
    .subscribe((resp: any[]) => {
      if(resp.length > 0){
        this.paisesreporte = resp;
        
        console.log(this.paisesreporte);
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Se ha generado el reporte de paises, creditos y clientes`, this.actual[2]);
  }

  /*Carrito de compras*/
  public anadirCarrito(producto: any, usuario: any, cantidad:any){
    this.http.get(`${this.API_URI}anadirCarrito?&usuario=${usuario}&producto=${producto}&cantidad=${cantidad}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp > 0){
        this.notificacionSuccess('Anadido a su carrito', "Ok");
      }else{
        this.notificacionError('Error al anadir al carrito', "Error");
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Anadido ${cantidad} productos CODIGO:${producto} al carrito`, this.actual[2]);
  }

  public carrito: any[];
  public verCarrito(usuario: any){
    this.http.get(`${this.API_URI}vercarrito?&usuario=${usuario}`)
    .subscribe((resp: any[]) => {
      console.log(resp);
      this.carrito = resp;
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Visualizacion de carrito`, this.actual[2]);
  }

  public vaciarCarrito(){
    this.actual = this.getCurrentUsert();
    this.http.get(`${this.API_URI}vaciarcarrito?&usuario=${this.actual[0]}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == 0){
        this.notificacionError("Error vaciando el carrito", "Error");
      }else{
        this.notificacionSuccess("Carrito vaciado", "Ok");
        location.reload();
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Vaciar de carrito`, this.actual[2]);
  }
  public quitarCarrito(carrito: any){
    this.http.get(`${this.API_URI}quitarcarrito?&carrito=${carrito}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == 0){
        this.notificacionError("Error al eliminar el producto del carrito", "Error");
      }else{
        location.reload();
      }
    });
    this.actual = this.getCurrentUsert();
    this.guardarBitacora(`Eliminacion de producto del carito`, this.actual[2]);
  }

  public confirmarCompra(usuario: any){
    this.http.get(`${this.API_URI}actualizarcreditos?&usuario=${usuario}`)
    .subscribe((resp: any[]) => {
      console.log(resp);
      if(resp.length > 0){
        this.actual = this.getCurrentUsert();
        this.actual[7] = resp[0][0];
        //precio viene en el 6
        //cantidad viene en el 3
        var totalCarrito = 0;
        for(var i = 0; i < this.carrito.length; i++){
          totalCarrito = totalCarrito + (this.carrito[i][6] * this.carrito[i][3]);
        }
        if(totalCarrito > this.actual[7]){
          this.notificacionError("No posee creditos suficientes", "Error");
        }else{
          this.cambiarCreditosComprador(this.actual[0], this.actual[7] - totalCarrito);
          this.actual[7] = this.actual[7] - totalCarrito;
          this.setUser(this.actual);
          this.crearFactura(this.actual[0]);
        }
      }
    });
  }

  public crearFactura(usuario: any){
    this.http.get(`${this.API_URI}crearfactura?&usuario=${usuario}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == 0){
        this.notificacionError("Factura no creada", "Error");
      }else{
        this.verFactura(usuario);
      }
    });
  }

  public verFactura(usuario: any){
    this.http.get(`${this.API_URI}verfacturas?&usuario=${usuario}`)
    .subscribe((resp: any[]) => {
      console.log(resp);
      if(resp.length == 0){
        this.notificacionError("No hay facturas", "Error");
      }else{
        var facturaAplicar = resp[0][0];
        for(var i = 0; i < this.carrito.length; i++){
          this.insertarDetalle(facturaAplicar, this.carrito[i][1],this.carrito[i][3]);
          this.cambiarestadoCarrito(this.carrito[i][0]);
          this.actualizarcreditosVendedor(this.carrito[i][7], (this.carrito[i][6]*this.carrito[i][3]))
          const textoCorreo = `<center>
                                <img src="https://static.wixstatic.com/media/d33133_f8f186c5630b47419aa60fdffc4691ce~mv2.png"  alt="Logo GTSales MarketPlace" width="100px">
                                <p>Estimado(a):</p>
                                <h1>
                                  <font color="#0B5345"><b>${this.carrito[i][9]}</b></h1></font>
                                <br>
                                Le informamos que se ha realizado una venta de uno de sus productos.
                                <br>
                                <br>
                                <b>Detalles:</b>
                                <br>
                                <br>
                                <table border="0" width="75%">
                                  <tr>
                                    <th bgcolor="#D7BDE2">Codigo</th>
                                    <th bgcolor="#D7BDE2">Cantidad</th>
                                    <th bgcolor="#D7BDE2">Nombre</th>
                                    <th bgcolor="#D7BDE2">Precio Unitario</th>
                                    <th bgcolor="#D7BDE2">Total</th>
                                  </tr>
                                  <tr>
                                    <td><center>${this.carrito[i][1]}</center></td>
                                    <td><center>${this.carrito[i][7]}</center></td>
                                    <td><center>${this.carrito[i][5]}</center></td>
                                    <td><center>$.${this.carrito[i][6]}</center></td>
                                    <td><center>$.${this.carrito[i][6] * this.carrito[i][7]}</center></td>
                                  </tr>
                                </table>
                                <br>
                                Le hemos acreditado el total de esta venta a su cuenta. 
                            </center>`;
          this.enviarCorreo(this.carrito[i][8], "Informe de venta", textoCorreo);
        }
        
      }
    });
  }

  public cambiarCreditosComprador(usuario: any, creditos: any){
    this.http.get(`${this.API_URI}actualizarmiscreditos?&usuario=${usuario}&creditos=${creditos}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == 0){
        this.notificacionError("error actualizando creditos del comprador", "error");
      }else{
        this.notificacionSuccess("Creditos del comprador actualizados", "Ok");
      }
    });
  }

  public actualizarcreditosVendedor(usuario: any, creditos: any){
    this.http.get(`${this.API_URI}actualizarcreditosvendedor?&usuario=${usuario}&creditos=${creditos}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == 0){
        this.notificacionError("creditos agregados NO", "Error");
      }else{
        this.notificacionSuccess("creditos agregados al vendedor", "Ok");
      }
    });
  }

  public insertarDetalle(correlativo: any, producto: any, cantidad: any){
    this.http.get(`${this.API_URI}insertardetalle?&correlativo=${correlativo}&producto=${producto}&cantidad=${cantidad}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == 0){
        this.notificacionError("no insertado a detalle", "Error");
      }else{
        this.notificacionSuccess("Insertado a detalle", "Ok");
      }
    });
  }

  public cambiarestadoCarrito(carrito: any){
    this.http.get(`${this.API_URI}cambiarestadocarrito?&carrito=${carrito}`)
    .subscribe((resp: any) => {
      console.log(resp);
      if(resp == 0){
        this.notificacionError("carrito no cambiado", "Error");
      }else{
        this.notificacionSuccess("carrito cambiado", "Ok");
      }
    });
  }
  
  recuperarContrasena(correo: any){
    this.http.get(`${this.API_URI}recuperarcontrasena?&correo=${correo}`)
    .subscribe((resp: any[]) => {
      if(resp.length == 0){
        this.notificacionError("Correo electronico no valido", "Error")
      }else{
        const textoCorreo = `<center>
                                <img src="https://image.flaticon.com/icons/png/512/230/230439.png"  alt="Logo GTSales MarketPlace" width="100px">
                                <p>Recuperacion de clave de <b>GTSales Marketplace</b> :</p>
                                <p>Por favor, haga <a href="http://localhost:4200/recuperarnueva/${correo}">click aqui</a> para recuperar su contrasena.
                                <br>
                                <br>
                                Si usted no ha realizado esta accion, ignore este correo
                                <br>
                                </center>`;
        this.enviarCorreo(correo, "Recuperacion de contrasena", textoCorreo);
        this.notificacionInfo("Link de recuperacion enviado a su correo electronico", "Ok");
        this.router.navigateByUrl('login');
      }
    });
  }
  
  contrasenaRecuperada(correo: any, contrasena: any){
    console.log(contrasena);
    console.log(correo);
    this.http.get(`${this.API_URI}setnuevacontrasena?&correo=${correo}&contrasena=${contrasena}`)
    .subscribe((resp: any) => {
      if(resp == 0){
        this.notificacionError("No se ha podido cambiar su contrasena", "Error");
      }else{
        this.notificacionSuccess("Contrasena actualizada con exito, ingrese para verificar", "Ok");
        this.router.navigateByUrl('login');
      }
    });
  }

  /*TOASTS NOTIFICACIONES*/
  notificacionError(contenido: any, titulo: any){
    this.toast.error(contenido, titulo, 
      {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-center',
      });
  }

  notificacionSuccess(contenido: any, titulo: any){
    this.toast.success(contenido, titulo, 
      {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-center',
      });
  }

  notificacionWarning(contenido: any, titulo: any){
    this.toast.warning(contenido, titulo, 
        {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center',
        });
  }

  notificacionInfo(contenido: any, titulo: any){
    this.toast.info(contenido, titulo, 
        {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-center',
        });
  }
  
  /*=====================================================================*/
}
