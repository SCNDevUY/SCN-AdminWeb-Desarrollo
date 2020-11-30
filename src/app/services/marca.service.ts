import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Modelo
import { Marca } from '../models/marca.model';

// Configuraciones
import { URL_SERVICIOS } from '../config/config';

// Firebase
// import * as firebase from 'firebase';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  marca: Marca;
  token: string;

  constructor( public http: HttpClient ) {

  }

    // Obtener marcas
    cargarMarcas( desde: number = 0, limite: number = 5, activo: boolean = true ) {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/marcas?activo=' + activo + '&desde=' + desde + '&limite=' + limite + '&token=' + this.token;

      return this.http.get( url );

    }

    // Crear marca
    crearMarca( marca: Marca) {

      this.token = localStorage.getItem('token');

      let url = URL_SERVICIOS + '/marcas';
      url += '?token=' + this.token;

      return this.http.post( url, marca );
  }


     // Actualizar marca
    actualizarMarca( marca: Marca ) {

      this.token = localStorage.getItem('token');

      let url = URL_SERVICIOS + '/marcas/' + marca._id;
      url += '?token=' + this.token;

      return this.http.put( url, marca );

    }

    // Buscar Marcas
    buscarMarcas( termino: string ) {

      const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

      return this.http.get( url )
          .pipe(
            map( (resp: any) => resp.marcas )
          );

    }

    // Borrar Marcas
    borrarMarca( marca: Marca ) {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/marcas/' + marca._id + '?token=' + this.token;

      // Borro imagen
      const storageRef = firebase.storage().ref();

      const imagen = marca.imgNombre;
      if ( imagen !== undefined ) {
          storageRef.child(`marcas/${ imagen }`)
          .delete();
      }

      return this.http.delete( url );

    }


    // Buscar 1 marca por ID
    buscarunaMarca( id: string ) {

      const url = URL_SERVICIOS + '/marcas/' + id ;

      return this.http.get( url )
          .pipe(
            map( (resp: any) => resp.marca )
          );

    }

}
