import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase';

// CONFIGURACIONES
import { URL_SERVICIOS } from '../config/config';

// MODELOS
import { Carousel } from '../models/carousel.model';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor( public http: HttpClient ) { }


    // Obtener CAROUSEL
    cargarCarousel( activo = true ) {

      const url = URL_SERVICIOS + '/carousel?activo=' + activo;
      return this.http.get( url );
    }


    // CREAR CAROUSEL
    crearCarousel( carousel: Carousel ) {

      const url = URL_SERVICIOS + '/carousel';
      return this.http.post( url, carousel );
    }


    // Actualizar CAROUSEL
    actualizarCarousel( carousel: Carousel ) {

      const url = URL_SERVICIOS + '/carousel/' + carousel._id;
      return this.http.put( url, carousel );

  }


    // Borrar Carousel
    borrarCarousel( carousel: Carousel ) {

      const url = URL_SERVICIOS + '/carousel/' + carousel._id;

      // Borro imagen
      const storageRef = firebase.storage().ref();

      const imagen = carousel.imgNombre;
      if ( imagen !== undefined ) {
          storageRef.child(`carousel/${ imagen }`)
          .delete();
      }

      return this.http.delete( url );

    }



}
