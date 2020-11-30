import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import * as firebase from 'firebase';
import firebase from 'firebase';

// CONFIGURACIONES
import { URL_SERVICIOS } from '../config/config';

// MODELOS
import { Tarjeta } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {

  constructor( public http: HttpClient ) { }



    // Obtener Tarjetas
    cargarTarjetas( activo = true ) {

      const url = URL_SERVICIOS + '/tarjetas?activo=' + activo;
      return this.http.get( url );
    }


    // CREAR Tarjeta
    crearTarjeta( tarjeta: Tarjeta ) {

      const url = URL_SERVICIOS + '/tarjetas';
      return this.http.post( url, tarjeta );
    }


    // Actualizar Tarjeta
    actualizarTarjeta( tarjeta: Tarjeta ) {

      const url = URL_SERVICIOS + '/tarjetas/' + tarjeta._id;
      return this.http.put( url, tarjeta );

  }


    // Borrar tarjeta
    borrarTarjeta( tarjeta: Tarjeta ) {

      const url = URL_SERVICIOS + '/tarjetas/' + tarjeta._id;

      // Borro imagen
      const storageRef = firebase.storage().ref();

      const imagen = tarjeta.imgNombre;
      if ( imagen !== undefined ) {
          storageRef.child(`tarjetas/${ imagen }`)
          .delete();
      }

      return this.http.delete( url );

    }





}

