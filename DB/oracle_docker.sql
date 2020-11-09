drop table detalle;
drop sequence sq_detalle;
drop table factura;
drop sequence sq_factura;
drop table carrito;
drop sequence sq_carrito;
drop table megusta;
drop sequence sq_megusta;
drop table comentario;
drop sequence sq_comentario;
drop table denuncia;
drop sequence sq_denuncia;
drop table mensaje;
drop sequence sq_mensaje;
drop table producto;
drop sequence sq_producto;
drop table usuario;
drop sequence sq_usuario;
drop table pais;
drop sequence sq_pais;
drop table tipo_usuario;
drop sequence sq_tipo_usuario;
drop table categoria;
drop sequence sq_categoria;
drop table bitacora;
drop sequence sq_bitacora;
commit;

/*------------------------------------------------------------------------------
                        PAIS
------------------------------------------------------------------------------*/
CREATE TABLE pais(
    pais    INTEGER         NOT NULL,
    nombre  VARCHAR2(100)   NOT NULL
);
ALTER TABLE pais ADD CONSTRAINT pais_pk PRIMARY KEY ( pais );

CREATE SEQUENCE sq_pais 
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_pais
BEFORE INSERT ON pais
FOR EACH ROW
BEGIN
    SELECT sq_pais.NEXTVAL INTO:NEW.pais FROM dual;
END;

/*------------------------------------------------------------------------------
                        TIPO_USUARIO
------------------------------------------------------------------------------*/
CREATE TABLE tipo_usuario(
    tipo_usuario    INTEGER         NOT NULL,
    nombre          VARCHAR2(100)   NOT NULL
);
ALTER TABLE tipo_usuario ADD CONSTRAINT tipo_usuario_pk PRIMARY KEY ( tipo_usuario );

CREATE SEQUENCE sq_tipo_usuario
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_tipo_usuario
BEFORE INSERT ON tipo_usuario
FOR EACH ROW
BEGIN
    SELECT sq_tipo_usuario.NEXTVAL INTO:NEW.tipo_usuario FROM dual;
END;


/*------------------------------------------------------------------------------
                        USUARIO
------------------------------------------------------------------------------*/
CREATE TABLE usuario(
    usuario             INTEGER         NOT NULL, 
    nombre              VARCHAR2(100)   NOT NULL,
    email               VARCHAR2(100)   NOT NULL,
    contrasena          VARCHAR2(100)   NOT NULL,
    fecha_nacimiento    DATE,
    pais                INTEGER,
    foto                VARCHAR2(100),
    creditos            FLOAT,
    tipo_usuario        INTEGER         NOT NULL,
    estado 		        INTEGER
);
ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( usuario );
ALTER TABLE usuario ADD CONSTRAINT usuario_pais_fk FOREIGN KEY ( pais ) REFERENCES pais ( pais );
ALTER TABLE usuario ADD CONSTRAINT usuario_tipo_usuario_fk FOREIGN KEY ( tipo_usuario ) REFERENCES tipo_usuario ( tipo_usuario );

CREATE SEQUENCE sq_usuario
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_usuario
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    SELECT sq_usuario.NEXTVAL INTO:NEW.usuario FROM dual;
END;

/*------------------------------------------------------------------------------
                        CATEGORIA
------------------------------------------------------------------------------*/
CREATE TABLE categoria(
    categoria       INTEGER         NOT NULL,
    nombre          VARCHAR2(100)   NOT NULL
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( categoria );

CREATE SEQUENCE sq_categoria
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_categoria
BEFORE INSERT ON categoria
FOR EACH ROW
BEGIN
    SELECT sq_categoria.NEXTVAL INTO:NEW.categoria FROM dual;
END;

/*------------------------------------------------------------------------------
                        PRODUCTO
------------------------------------------------------------------------------*/
CREATE TABLE producto(
    producto        INTEGER         NOT NULL,
    nombre          VARCHAR2(100)   NOT NULL,
    detalle         VARCHAR(200)    NOT NULL,
    palabras_clave  VARCHAR(100),
    precio          FLOAT           NOT NULL,
    categoria       INTEGER         NOT NULL,
    propietario     INTEGER         NOT NULL,
    foto            VARCHAR2(100)   NOT NULL,
    estado	    INTEGER DEFAULT 1
);
ALTER TABLE producto ADD CONSTRAINT producto_pk PRIMARY KEY ( producto );
ALTER TABLE producto ADD CONSTRAINT producto_categoria_fk FOREIGN KEY ( categoria ) REFERENCES categoria ( categoria );
ALTER TABLE producto ADD CONSTRAINT producto_usuario_fk FOREIGN KEY ( propietario ) REFERENCES usuario ( usuario );

CREATE SEQUENCE sq_producto
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_producto
BEFORE INSERT ON producto
FOR EACH ROW
BEGIN
    SELECT sq_producto.NEXTVAL INTO:NEW.producto FROM dual;
END;

/*------------------------------------------------------------------------------
                        DENUNCIA
------------------------------------------------------------------------------*/
CREATE TABLE denuncia(
    denuncia    INTEGER NOT NULL,
    usuario     INTEGER NOT NULL,
    producto    INTEGER NOT NULL,
    contenido   VARCHAR2(200),
    estado	INTEGER DEFAULT 0,
    fecha	DATE
);
ALTER TABLE denuncia ADD CONSTRAINT denuncia_pk PRIMARY KEY ( denuncia );
ALTER TABLE denuncia ADD CONSTRAINT denuncia_producto_fk FOREIGN KEY ( producto ) REFERENCES producto ( producto );
ALTER TABLE denuncia ADD CONSTRAINT denuncia_usuario_fk FOREIGN KEY ( usuario ) REFERENCES usuario ( usuario );

CREATE SEQUENCE sq_denuncia
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_denuncia
BEFORE INSERT ON denuncia
FOR EACH ROW
BEGIN
    SELECT sq_denuncia.NEXTVAL INTO:NEW.denuncia FROM dual;
END;

/*------------------------------------------------------------------------------
                        ME GUSTA
------------------------------------------------------------------------------*/
CREATE TABLE megusta(
    id_megusta      INTEGER NOT NULL,
    usuario         INTEGER NOT NULL,
    producto        INTEGER NOT NULL,
    estado          INTEGER NOT NULL
);
ALTER TABLE megusta ADD CONSTRAINT megusta_pk PRIMARY KEY ( id_megusta );
ALTER TABLE megusta ADD CONSTRAINT megusta_producto_fk FOREIGN KEY ( producto ) REFERENCES producto ( producto );
ALTER TABLE megusta ADD CONSTRAINT megusta_usuario_fk FOREIGN KEY ( usuario ) REFERENCES usuario ( usuario );

CREATE SEQUENCE sq_megusta
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_megusta
BEFORE INSERT ON megusta
FOR EACH ROW
BEGIN
    SELECT sq_megusta.NEXTVAL INTO:NEW.id_megusta FROM dual;
END;




/*------------------------------------------------------------------------------
                        MENSAJE
------------------------------------------------------------------------------*/
CREATE TABLE mensaje(
    mensaje     INTEGER NOT NULL,
    emisor      INTEGER NOT NULL,
    receptor    INTEGER NOT NULL,
    contenido   VARCHAR2(200),
    fecha       DATE
);
ALTER TABLE mensaje ADD CONSTRAINT mensaje_pk PRIMARY KEY ( mensaje );
ALTER TABLE mensaje ADD CONSTRAINT mensaje_emisor_fk FOREIGN KEY ( emisor ) REFERENCES usuario ( usuario );
ALTER TABLE mensaje ADD CONSTRAINT mensaje_receptor_fk FOREIGN KEY ( receptor ) REFERENCES usuario ( usuario );

CREATE SEQUENCE sq_mensaje
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_mensaje
BEFORE INSERT ON mensaje
FOR EACH ROW
BEGIN
    SELECT sq_mensaje.NEXTVAL INTO:NEW.mensaje FROM dual;
END;

/*------------------------------------------------------------------------------
                        COMENTARIO
------------------------------------------------------------------------------*/
CREATE TABLE comentario(
    comentario      INTEGER NOT NULL,
    usuario         INTEGER NOT NULL,
    producto        INTEGER NOT NULL,
    contenido       VARCHAR2(100),
    fecha           DATE
);
ALTER TABLE comentario ADD CONSTRAINT comentario_pk PRIMARY KEY ( comentario );
ALTER TABLE comentario ADD CONSTRAINT comentario_producto_fk FOREIGN KEY ( producto ) REFERENCES producto ( producto );
ALTER TABLE comentario ADD CONSTRAINT comentario_usuario_fk FOREIGN KEY ( usuario ) REFERENCES usuario ( usuario );



CREATE SEQUENCE sq_comentario
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_comentario
BEFORE INSERT ON comentario
FOR EACH ROW
BEGIN
    SELECT sq_comentario.NEXTVAL INTO:NEW.comentario FROM dual;
END;

/*------------------------------------------------------------------------------
                        BITACORA
------------------------------------------------------------------------------*/
CREATE TABLE bitacora(
    bitacora    INTEGER NOT NULL,
    accion      VARCHAR2(200),
    fecha       DATE,
    correo 	    VARCHAR2(100)
);

ALTER TABLE bitacora ADD CONSTRAINT bitacora_pk PRIMARY KEY ( bitacora );

CREATE SEQUENCE sq_bitacora
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_bitacora
BEFORE INSERT ON bitacora
FOR EACH ROW
BEGIN
    SELECT sq_bitacora.NEXTVAL INTO:NEW.bitacora FROM dual;
END;

/*------------------------------------------------------------------------------
                        CARRITO
------------------------------------------------------------------------------*/
CREATE TABLE carrito(
    carrito     INTEGER NOT NULL,
    producto    INTEGER NOT NULL,
    usuario     INTEGER NOT NULL,
    cantidad    INTEGER,
    estado      INTEGER
);
ALTER TABLE carrito ADD CONSTRAINT carrito_pk PRIMARY KEY ( carrito );
ALTER TABLE carrito ADD CONSTRAINT carrito_producto_fk FOREIGN KEY ( producto ) REFERENCES producto ( producto );
ALTER TABLE carrito ADD CONSTRAINT carrito_usuario_fk FOREIGN KEY ( usuario ) REFERENCES usuario ( usuario );

CREATE SEQUENCE sq_carrito
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_carrito
BEFORE INSERT ON carrito
FOR EACH ROW
BEGIN
    SELECT sq_carrito.NEXTVAL INTO:NEW.carrito FROM dual;
END;


/*------------------------------------------------------------------------------
                    FACTURA
------------------------------------------------------------------------------*/
CREATE TABLE factura(
    correlativo INTEGER NOT NULL,
    usuario     INTEGER NOT NULL,
    fecha       DATE
);
ALTER TABLE factura ADD CONSTRAINT factura_pk PRIMARY KEY ( correlativo);
ALTER TABLE factura ADD CONSTRAINT factura_usuario_fk FOREIGN KEY ( usuario ) REFERENCES usuario ( usuario );

CREATE SEQUENCE sq_factura
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_factura
BEFORE INSERT ON factura
FOR EACH ROW
BEGIN
    SELECT sq_factura.NEXTVAL INTO:NEW.correlativo FROM dual;
END;

/*------------------------------------------------------------------------------
                    DETALLE
------------------------------------------------------------------------------*/
CREATE TABLE detalle(
    id_detalle  INTEGER NOT NULL,
    correlativo INTEGER NOT NULL,
    producto    INTEGER NOT NULL,
    cantidad    INTEGER NOT NULL
);
ALTER TABLE detalle ADD CONSTRAINT detalle_pk PRIMARY KEY ( id_detalle );
ALTER TABLE detalle ADD CONSTRAINT detalle_factura_fk FOREIGN KEY ( correlativo ) REFERENCES factura ( correlativo );
ALTER TABLE detalle ADD CONSTRAINT detalle_producto_fk FOREIGN KEY ( producto ) REFERENCES producto ( producto );

CREATE SEQUENCE sq_detalle
START WITH 1 
INCREMENT BY 1 
ORDER;

CREATE OR REPLACE TRIGGER tg_detalle
BEFORE INSERT ON detalle
FOR EACH ROW
BEGIN
    SELECT sq_detalle.NEXTVAL INTO:NEW.id_detalle FROM dual;
END;

/*------------------------------------------------------------------------------
                        INSERCION
------------------------------------------------------------------------------*/
insert into pais (pais, nombre) values(0,'Guatemala');
insert into pais (pais, nombre) values(0,'El Salvador');
insert into pais (pais, nombre) values(0,'Honduras');
insert into pais (pais, nombre) values(0,'Nicaragua');
insert into pais (pais, nombre) values(0,'Costa Rica');
insert into pais (pais, nombre) values(0,'Panama');

insert into tipo_usuario(tipo_usuario, nombre) values (0, 'administrador');
insert into tipo_usuario(tipo_usuario, nombre) values (0, 'cliente');

insert into usuario(usuario, nombre, email, contrasena, tipo_usuario,estado, foto) values (0, 'admin', 'admin@ejemplo.com', '678', 1,1, 'admin.png');
insert into usuario(usuario, nombre, email, contrasena, fecha_nacimiento, pais, foto, creditos, tipo_usuario,estado) values (0, 'Melyza Rodriguez', 'mlzdrg792@gmail.com', '678', '14-11-1994', 1, 'default.png', 10000, 2, 1);
insert into usuario(usuario, nombre, email, contrasena, fecha_nacimiento, pais, foto, creditos, tipo_usuario,estado) values (0, 'Alejandra Contreras', '2593602600101@ingenieria.usac.edu.gt', '678', '14-11-1994', 1, 'default.png', 10000, 2, 1);
insert into usuario(usuario, nombre, email, contrasena, fecha_nacimiento, pais, foto, creditos, tipo_usuario,estado) values (0, 'Jasmine Miranda', 'mlzdrg794@gmail.com', '678', '14-11-1994', 1, 'default.png', 10000, 2, 1);
insert into usuario(usuario, nombre, email, contrasena, fecha_nacimiento, pais, foto, creditos, tipo_usuario,estado) values (0, 'Andres Miranda', 'mlzdrg795@gmail.com', '678', '14-11-1994', 1, 'default.png', 10000, 2, 1);
insert into usuario(usuario, nombre, email, contrasena, fecha_nacimiento, pais, foto, creditos, tipo_usuario,estado) values (0, 'Jorge Mendez', 'mlzdrg791@gmail.com', '678', '27-03-1993', 1, 'default.png', 10000, 2, 1);
insert into usuario(usuario, nombre, email, contrasena, fecha_nacimiento, pais, foto, creditos, tipo_usuario,estado) values (0, 'Anibal Diaz', 'mlzdrg797@gmail.com', '678', '27-03-1993', 1, 'default.png', 10000, 2, 1);

insert into categoria(categoria, nombre) values (0, 'Ropa');/*1*/
insert into categoria(categoria, nombre) values (0, 'Calzado');/*2*/
insert into categoria(categoria, nombre) values (0, 'Hogar');/*3*/
insert into categoria(categoria, nombre) values (0, 'Jardin');/*4*/
insert into categoria(categoria, nombre) values (0, 'Alimentos');/*5*/
insert into categoria(categoria, nombre) values (0, 'Carros');/*6*/
insert into categoria(categoria, nombre) values (0, 'Belleza');/*7*/
insert into categoria(categoria, nombre) values (0, 'Cocina');/*8*/
insert into categoria(categoria, nombre) values (0, 'Electronica');/*9*/
insert into categoria(categoria, nombre) values (0, 'Electrodomesticos');/*10*/
insert into categoria(categoria, nombre) values (0, 'Escuela');/*11*/
insert into categoria(categoria, nombre) values (0, 'Mascotas');/*12*/
insert into categoria(categoria, nombre) values (0, 'Oficina');/*13*/
insert into categoria(categoria, nombre) values (0, 'Juguetes');/*14*/

/*Productos de Andres Miranda No. 5 mlzdrg795@gmail.com*/
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Doritos','Doritos Rojos bolsa de 250gramos','Doritos,Rojo',10.50,5,5,1,'alimentacion1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto)  values (0,'Gaseosa','Gaseosa Cocacola 450ml original','Coca,cola,cocacola,gaseosa',7.0,5,5,1, 'alimentacion2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto)  values (0,'Doritos','Doritos Rojos bolsa de 250gramos','Doritos,Rojo',10.50,5,5,1, 'alimentacion3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto)  values (0,'Doritos','Doritos Rojos bolsa de 250gramos','Doritos,Rojo',10.50,5,5,1, 'alimentacion4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Llantas','Llantas para automovil color negro','Llantas,negro',1000,6,5,1,'autos1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Aromatizante','Aromatizante para automovil diferentes fragancias','Aromatizante,fragancia',25.50,6,5,1,'autos2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Aceite','Aceite para motor','Aceite,motor,carro',35.0,6,5,1,'autos3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Alfombras','Set de 4 alfombras para automovil en color rojo material resistente','Alfombra,Rojo,Carro',85.75,6,5,1,'autos4.jpg');

/*Productos de Jasmine Miranda No. 4 mlzdrg794@gmail.com*/
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Sarten','Sarten antiadherente 25cm de diametro Teflon','Sarten,teflon',120,8,4,1,'cocina1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Olla','Olla de aluminio color negro con tapadera de vidrio','Olla,negro,vidrio',170.50,8,4,1,'cocina2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Cuchillos','Set de cuchillos diferentes propositos','Cuchillos',125,8,4,1,'cocina3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Ensaladera','Recipiente para ensaladas fibra de vidrio color blanco','Ensaladera,blanco,bowl',90,8,4,1,'cocina4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Crema corporal','Crema corporal 450mL con vitamina E','Crema,corporal,vitaminae',50,7,4,1,'belleza1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Sombras de ojos','Juego de sombras de ojos 200 colores diferentes','Maquillaje,sombras',420,7,4,1,'belleza2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Brochas','Brochas para aplicacion de maquillaje, sombras, rubor, labial y mas','Brochas,maquillaje',100,7,4,1,'belleza3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Labial','Labial color lila 35 gramos marca Lips','Labial,maquillaje',80,7,4,1,'belleza4.jpg');

/*Productos del usuario Jorge Mendez No.6 mlzdrg791@gmail.com*/
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Mouse','Mouse alambrico color negro','Mouse,negro,alambrico',50,9,6,1,'elec1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Teclado','Teclado para computadora con luces LED de colores','Teclado,Gamer',475,9,6,1,'elec2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Audifonos','Audifonos con cable sonido estereo','Audifonos,estereo,cable',200,9,6,1,'elec3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Memoria USB','Memoria USB capacidad 16GB','USB,Memoria',75,9,6,1,'elec4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Microondas','Microondas con teclado digital y tres intensidades','Microondas,potencia',700,10,6,1,'electrodomestico1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Estufa','Estufa a gas color gris con horno grande','Estufa,horno',2500,10,6,1,'electrodomestico2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Batidora','Batidora para reposteria color rojo','Batidora,reposteria,rojo',850,10,6,1,'electrodomestico3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Licuadora','Licuadora para hogar, varias intensidades de potencia y funcion de triturar hielo','Licuadora,hielo',580,10,6,1,'electrodomestico4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Mochila','Mochila universitaria con varios compartimientos, compartimiento para laptop','Mochila,laptop,universidad',250,11,6,1,'escuela1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Cuaderno','Cuaderno espiral de 100 hojas en varios colores disponibles','Cuaderno,espiral,escolar',10.25,11,6,1,'escuela2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Marcadores','Marcadores de colores marca Crayola','Marcadores,Crayola',25,11,6,1,'escuela3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Crayones','Crayones de cera 12 colores marca Crayola','Crayones,Crayola',20,11,6,1,'escuela4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Rastrillo','Rastrillo para retirar hojas','Jardin,rastrillo',150,4,6,1,'jardin1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Tijeras','Tijeras para podar plantas','Plantas,Jardin,Tijeras',180,4,6,1,'jardin2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Maceta','Maseta para jardin 60 cm de diametro','Maceta,Jardin',90,4,6,1,'jardin3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Escalera','Escalera de aluminio para jardin','Aluminio,Escalera,Jardin',380,4,6,1,'jardin4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Barbie','Muneca Barbie Colors 7 sorpresas en una para sumergir en agua','Barbie,Colors',260,14,6,1,'juguetes1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Carrito','Carrito marca Hotwheels coleccionables, metal y plastico','hotwheels,carrito',30,14,6,1,'juguetes2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Peluche','Peluche de osito en varios colores disponibles','Peluche,oso,jueguetes',80,14,6,1,'juguetes3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Set Lego','Set LEGO original de Harry Potter','HarryPotter,LEGO,SETLEGO',250,14,6,1,'juguetes4.jpg');

/*Productos del usuario Anibal Diaz No.7 mlzdrg797@gmail.com*/
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Shampoo','Shampoo antipulgas para perro','Shampoo,perro',45,12,7,1,'mascotas1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Recipiente','Recipiente para alimiento de mascota','Recipiente,Comida,Perro',45,12,7,1,'mascotas2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Cepillo','Cepillo quita pelo para perro elimina el pelo caido','Pelo,Mascota,Perro',75,12,7,1,'mascotas3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Juguete','Juguete para perro resistente a las mordidas','Juguete,Perro',15,12,7,1,'mascotas4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Engrapadora','Engrapadora de oficina con grapas incluidas','Engrapadora,Grapas,Utiles,Oficina',50,13,7,1,'oficina1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Resma de hojas','Resma de hojas blancas tamano carta de 75 gramos 1000 unidades','Hojas,oficina,resma',24,13,7,1,'oficina2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Clips','Clips metalicos para oficina 50 unidades','Clips,oficina',15,13,7,1,'oficina3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Toner','Toner para fotocopiadora','Toner,Fotocopiadora,Fotocopias',142,13,7,1,'oficina4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Camisa','Camisa para caballero, manga corta, diseno de cuadros talla M','Camisa,Casual,Ropa',120,1,7,1,'ropa1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Blusa','Blusa para dama color azul oscuro talla M','Blusa,Dama',100,1,7,1,'ropa2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Jeans','Jeans color azul diferentes tallas','Jeans,Azul',300,1,7,1,'ropa3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Falda','Falda larga con diseno de flores','Falda,flores',140,1,7,1,'ropa4.jpg');

insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Zapatos','Zapatos formales para caballero tallas 38 -40','Zapatos,Caballero',300,2,7,1,'zapatos1.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Zapatillas','Zapatos casuales para dama varios colores y tallas disponibles','Zapatos,Calzado,Casual',130,2,7,1,'zapatos2.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Zapatos de tacon','Zapatos de tacon color rosa palido talla 35 tacon bajo','Tacones,Dama',250,2,7,1,'zapatos3.jpg');
insert into producto(producto, nombre, detalle, palabras_clave, precio, categoria, propietario, estado, foto) values (0,'Zapatos deportivos','Zapatos deportivos con diseno negro y rojo comodos y resistentes','Zapatos,Deporte,Tenis',325,2,7,1,'zapatos4.jpg');

commit;