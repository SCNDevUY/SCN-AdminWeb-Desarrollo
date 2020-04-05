import { Injectable, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor( private storage: AngularFireStorage ) { }


  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( ( resolve, reject ) => {

        const storageRef = firebase.storage().ref();

        const uploadTask: firebase.storage.UploadTask =
          storageRef.child(`${ tipo }/${ archivo.name }`)
              .put( archivo );

        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,

            () => {},
            ( error ) => console.error('Error al subir', error),
            () => {

              console.log('Imagen subida');

            });

    });

    // return new Promise( ( resolve, reject ) => {

    //   const formData = new FormData();
    //   const xhr = new XMLHttpRequest();

    //   formData.append( 'imagen', archivo, archivo.name );

    //   xhr.onreadystatechange = () => {

    //     if ( xhr.readyState === 4 ) {

    //       if ( xhr.status === 200 ) {
    //         console.log('Imagen subida');
    //         resolve( JSON.parse( xhr.response ) );
    //       } else {
    //         console.log('Fallo la subida');
    //         reject( xhr.response );
    //       }

    //     }
    //   };

    //   const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

    //   xhr.open('PUT', url, true);
    //   xhr.send( formData );

    // });


  }

}
