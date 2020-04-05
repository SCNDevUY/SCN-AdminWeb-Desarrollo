import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { URL_SERVICIOS } from '../config/config';

// Firebase
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

// import { SubirArchivoService } from './subir-archivo.service';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string;

    url: any = '';

    constructor( public http: HttpClient,
                 public router: Router,
                 private storage: AngularFireStorage ) {

      this.cargarStorage();
    }

    // Ver si esta logueado
    estaLogueado() {
        if ( this.token.length > 5 ) {
          return true;
        } else {
          return false;
        }
    }

    // Cargar Storage
    cargarStorage() {

        if ( localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.usuario = JSON.parse( localStorage.getItem('usuario') );
        } else {
          this.token = '';
          this.usuario = null;
        }
    }

    // Guargar Storage
    guardarStorage( id: string, token: string, usuario: Usuario) {

      localStorage.setItem('id', id );
      localStorage.setItem('token', token );
      localStorage.setItem('usuario', JSON.stringify( usuario ) );

      this.usuario = usuario;
      this.token = token;
    }

    // Logout
    logout() {
        this.token = '';
        this.usuario = null;
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        this.router.navigate(['/login']);
    }

    // Login con Google
    loginGoogle( token: string ) {

      const url = URL_SERVICIOS + '/login/google';

      return this.http.post( url, { token } )
        .pipe(
          map( (resp: any) => {
              this.guardarStorage( resp.id, resp.token, resp.usuario );
              return true;
          })
        );

    }

    // Login normal
    login( usuario: Usuario, recordar: boolean = false ) {

      if ( recordar ) {
        localStorage.setItem( 'email', usuario.email );
      } else {
        localStorage.removeItem('email');
      }

      const url = URL_SERVICIOS + '/login';

      return this.http.post( url, usuario )
        .pipe(
            map( (resp: any) => {
                this.guardarStorage( resp.id, resp.token, resp.usuario );
                return true;
            })
        );

    }

    // Crear usuario
    crearUsuario( usuario: Usuario ) {

        const url = URL_SERVICIOS + '/usuario';

        return this.http.post( url, usuario )
              .pipe(
                  map( (resp: any) => {

                    Swal.fire({
                      title: 'Usuario Creado',
                      text: usuario.email,
                      icon: 'success',
                      confirmButtonText: 'Bien!'
                    });
                    return resp.usuarios;
                  })
              );
    }

    // Actualizar usuario
    actualizarUsuario( usuario: Usuario ) {

      let url = URL_SERVICIOS + '/usuario/' + usuario._id;
      url += '?token=' + this.token;

      return this.http.put( url, usuario )
        .pipe(
          map( (resp: any) => {

              if ( usuario._id === this.usuario._id ) {
                const usuarioDB: Usuario = resp.usuario;
                this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
              }

              Swal.fire({
                title: 'Usuario Modificado',
                text: usuario.nombre,
                icon: 'success',
                confirmButtonText: 'Bien!'
              });

              return true;
          })
        );

    }



    // Cambiar Imagen
    cambiarImagen( archivo: File, id: string ) {

      const imagenVieja = this.usuario.imgNombre;

      // Obtener nombre del archivo
      const nombreCortado = archivo.name.split('.');
      const extensionArchivo = nombreCortado[nombreCortado.length - 1];

      // Nombre de archivo persolalizado
      const nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${extensionArchivo}`;


      const storageRef = firebase.storage().ref();

      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`usuarios/${ nombreArchivo }`)
            .put( archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          null,
          ( error ) => console.error('Error al subir', error),
          () => {

              uploadTask.snapshot.ref.getDownloadURL().then( (URL) => {

                this.usuario.img = URL;
                this.usuario.imgNombre = nombreArchivo;
                // this.guardarStorage( id, this.token, this.usuario );

                // Borro imagen vieja
                storageRef.child(`usuarios/${ imagenVieja }`)
                .delete();

                this.actualizarUsuario( this.usuario )
                    .subscribe();
              });

      });




    }




    cargarUsuarios( desde: number = 0 ) {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/usuario?desde=' + desde + '&token=' + this.token;

      return this.http.get( url );

    }


    buscarUsuarios( termino: string ) {

      const url = URL_SERVICIOS + '/busqueda/usuarios/' + termino;

      return this.http.get( url )
          .pipe(
            map( (resp: any) => resp.usuarios )
          );

    }

    borrarUsuario( id: string ) {

      const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
      return this.http.delete( url );

    }

}
