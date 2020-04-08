import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';

// Configuraciones
import { URL_SERVICIOS } from '../config/config';

// Firebase
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

// Modelos
import { Usuario } from 'src/app/models/usuario.model';

// Servicios
import { UsuarioService } from './usuario.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor( private storage: AngularFireStorage,
               private usuarioService: UsuarioService,
               public http: HttpClient,
               public _modalUploadService: ModalUploadService ) {

  }

    // Cambiar Imagen
    async subirArchivoUsuario( archivo: File, usuario: Usuario ) {


      const imagenVieja = usuario.imgNombre;

      // Obtener nombre del archivo
      const nombreCortado = archivo.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];

      // Nombre de archivo persolalizado
      const nombreArchivo = `${ usuario._id }-${ new Date().getMilliseconds() }.${extensionArchivo}`;

      // Subo archivo a Firebase
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

                // Actualizo el usuario en la DB
                this.actualizarUsuario( usuario )
                .subscribe( resp => {

                  // Borro imagen vieja
                  if ( imagenVieja !== undefined ) {
                      storageRef.child(`usuarios/${ imagenVieja }`)
                      .delete();
                  }

                  Swal.fire({
                    title: 'Atencion!',
                    text: 'Imagen actualizada',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });

                  this._modalUploadService.notificacion.emit( usuario );

                  this._modalUploadService.cargando = false;
                  this._modalUploadService.ocultarModal();

                });


            });
        });

      return true;

    }

    // Actualizar usuario
    actualizarUsuario( usuario: Usuario ) {

      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');

      let url = URL_SERVICIOS + '/usuario/' + usuario._id;
      url += '?token=' + token;

      return this.http.put( url, usuario )
        .pipe(
          map( (resp: any) => {

              if ( id === usuario._id ) {
                const usuarioDB: Usuario = resp.usuario;
                this.usuarioService.guardarStorage( usuarioDB._id, token, usuarioDB );
              }
              return true;
          })
        );

    }



  }


