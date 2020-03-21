import { Injectable, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: String, id: String ) {

    return new Promise( ( resolve, reject ) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = () => {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log('Imagen subida');
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Fallo la subida');
            reject( xhr.response );
          }

        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });


  }

}
