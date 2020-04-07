import { Injectable, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

// Firebase
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from './usuario.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor( private storage: AngularFireStorage,
               private usuarioService: UsuarioService ) {

  }

    // Cambiar Imagen
    subirArchivoUsuario( archivo: File, usuario: Usuario ) {

      const imagenVieja = usuario.imgNombre;

      // Obtener nombre del archivo
      const nombreCortado = archivo.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];

      // Nombre de archivo persolalizado
      const nombreArchivo = `${ usuario._id }-${ new Date().getMilliseconds() }.${extensionArchivo}`;


      const storageRef = firebase.storage().ref();

      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`usuarios/${ nombreArchivo }`)
            .put( archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          ( error ) => console.error('Error al subir', error),
          () => {

              uploadTask.snapshot.ref.getDownloadURL().then( (URL) => {

                usuario.img = URL;
                usuario.imgNombre = nombreArchivo;
                // this.guardarStorage( id, this.token, this.usuario );

                // Borro imagen vieja
                storageRef.child(`usuarios/${ imagenVieja }`)
                .delete();

                this.usuarioService.actualizarUsuario( usuario )
                    .subscribe();

              });

      });

    }

  }


