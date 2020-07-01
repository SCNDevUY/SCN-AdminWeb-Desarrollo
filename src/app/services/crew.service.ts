import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase';

// CONFIGURACIONES
import { URL_SERVICIOS } from '../config/config';

// MODELOS
import { Crew } from '../models/crew.model';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  constructor( public http: HttpClient ) { }



    // Obtener CREW
    cargarCrew( activo = true ) {

      const url = URL_SERVICIOS + '/crew?activo=' + activo;
      return this.http.get( url );
    }


    // CREAR CREW
    crearCrew( crew: Crew ) {

      const url = URL_SERVICIOS + '/crew';
      return this.http.post( url, crew );
    }


    // Actualizar CREW
    actualizarCrew( crew: Crew ) {

      const url = URL_SERVICIOS + '/crew/' + crew._id;
      return this.http.put( url, crew );

  }


    // Borrar CREW
    borrarCrew( crew: Crew ) {

      const url = URL_SERVICIOS + '/crew/' + crew._id;

      // Borro imagen
      const storageRef = firebase.storage().ref();

      const imagen = crew.imgNombre;
      if ( imagen !== undefined ) {
          storageRef.child(`crew/${ imagen }`)
          .delete();
      }

      return this.http.delete( url );

    }





}
