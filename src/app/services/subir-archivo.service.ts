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
    async subirArchivo( archivo: File, data: any, tipo: string ) {

      const imagenVieja = data.imgNombre;

      // Obtener nombre del archivo
      const nombreCortado = archivo.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];

      // Nombre de archivo persolalizado
      const nombreArchivo = `${ data._id }-${ new Date().getMilliseconds() }.${extensionArchivo}`;

      // Subo archivo a Firebase
      const storageRef = firebase.storage().ref();

      const uploadTask: firebase.storage.UploadTask =
         storageRef.child(`${tipo}/${ nombreArchivo }`)
            .put( archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          ( error ) => console.error('Error al subir', error),
          () => {

            uploadTask.snapshot.ref.getDownloadURL().then( (URL) => {

                data.img = URL;
                data.imgNombre = nombreArchivo;

                // Actualizo el usuario en la DB
                this.actualizarData( data, tipo )
                .subscribe( resp => {

                  // Borro imagen vieja
                  if ( imagenVieja !== undefined ) {
                      storageRef.child(`${tipo}/${ imagenVieja }`)
                      .delete();
                  }

                  Swal.fire({
                    title: 'Atencion!',
                    text: 'Imagen actualizada',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });

                  if ( tipo === 'usuarios') {
                    this._modalUploadService.notificacion.emit( data );
                  }

                  this._modalUploadService.cargando = false;
                  this._modalUploadService.ocultarModal();

                });

            });
        });

      return true;

    }

    // Actualizar data
    actualizarData( data: any, tipo: string ) {

      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');

      let url = URL_SERVICIOS + '/' + tipo + '/' + data._id;
      url += '?token=' + token;

      return this.http.put( url, data )
        .pipe(
          map( (resp: any) => {

            if ( tipo === 'usuarios' ) {
              if ( id === data._id ) {
                const usuarioDB: Usuario = resp.usuario;
                this.usuarioService.guardarStorage( usuarioDB._id, token, usuarioDB );
              }
            }
            return true;
          })
        );

    }



  }


