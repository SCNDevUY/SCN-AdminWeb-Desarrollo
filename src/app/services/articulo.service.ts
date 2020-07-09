import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Modelo
import { Articulo } from '../models/articulo.model';

// Configuraciones
import { URL_SERVICIOS } from '../config/config';

// Firebase
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  articulo: Articulo;
  token: string;

  constructor( public http: HttpClient ) {

  }

    // Obtener cantidades
    cantidades() {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/articulos/cantidades?&token=' + this.token;

      return this.http.get( url );

    }


    // Obtener articulos
    cargarArticulos( desde: number = 0, limite: number = 5, activo: boolean = true ) {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/articulos?activo=' + activo + '&desde=' + desde + '&token=' + this.token + '&limite=' + limite;

      return this.http.get( url );

    }

    // Obtener articulos TODOS
    cargarArticulosTodos() {

      const url = URL_SERVICIOS + '/articulos/todos';

      return this.http.get( url );

    }

    // Obtener articulos
    cargarArticulosMailing() {

          this.token = localStorage.getItem('token');
          const url = URL_SERVICIOS + '/articulos/mailing?token=' + this.token;

          return this.http.get( url );

    }


    // Obtener articulos
    cargarArticulosInicio() {

          this.token = localStorage.getItem('token');
          const url = URL_SERVICIOS + '/articulos/inicio?token=' + this.token;

          return this.http.get( url );

    }




    // Obtener articulos Ofertas
    cargarArticulosOfertas() {

          this.token = localStorage.getItem('token');
          const url = URL_SERVICIOS + '/articulos/ofertas?token=' + this.token;

          return this.http.get( url );

    }


    // Obtener articulos Super Oferta
    cargarArticulosSuperOferta() {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/articulos/superoferta?token=' + this.token;

      return this.http.get( url );

    }



    // Obtener articulos SlideShow
    cargarArticulosSlideshow() {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/articulos/slideshow?token=' + this.token;

      return this.http.get( url );

    }



    // Obtener articulos Nuevos
    cargarArticulosNuevos( desde: number = 0 ) {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/articulos/nuevos?desde=' + desde + '&token=' + this.token;

      return this.http.get( url );

    }


    // Buscar articulos
    buscarArticulos( termino: string, activo: boolean ) {

      const url = URL_SERVICIOS + '/busqueda/articulos/' + termino + '?activo=' + activo;

      return this.http.get( url )
          .pipe(
            map( (resp: any) => resp.articulos )
          );

    }

    // Buscar articulos Nuevos
    buscarArticulosNuevos( termino: string ) {

      const url = URL_SERVICIOS + '/busqueda/articulos/nuevos/' + termino;

      return this.http.get( url )
          .pipe(
            map( (resp: any) => resp.articulos )
          );

    }


    // Buscar 1 articulo por ID
    buscarunArticulo( id: string ) {

      const url = URL_SERVICIOS + '/articulos/' + id ;

      return this.http.get( url )
          .pipe(
            map( (resp: any) => resp.articulo )
          );

    }


     // Actualizar articulo
     actualizarArticulo( articulo: Articulo ) {

      this.token = localStorage.getItem('token');

      let url = URL_SERVICIOS + '/articulos/' + articulo._id;
      url += '?token=' + this.token;

      return this.http.put( url, articulo );

    }


    // Crear Articulo
    crearArticulo( articulo: Articulo ) {

      const url = URL_SERVICIOS + '/articulos/';
      return this.http.post( url, articulo );
    }



    // Cargar Archivo
    cargarArchivo( archivo: File ) {

      const formData: FormData = new FormData();
      formData.append('archivo', archivo, archivo.name);

      const url = URL_SERVICIOS + '/articulos/cargararchivo';
      return this.http.post( url, formData );
    }

}
