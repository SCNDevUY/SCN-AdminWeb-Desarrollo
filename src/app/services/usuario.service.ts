import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { URL_SERVICIOS } from '../config/config';
import { SubirArchivoService } from './subir-archivo.service';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string;

    constructor( public http: HttpClient,
                 public router: Router,
                 public _subirArchivoService: SubirArchivoService ) {

      console.log('Servicio de usuario listo!');
      this.cargarStorage();
      console.log('ID DEL USUARIO!!!' + this.usuario._id);
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

              const usuarioDB: Usuario = resp.usuario;
              this.guardarStorage( usuarioDB._id, this.token, usuarioDB );

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

      this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {
          this.usuario.img = resp.usuario.img;
          this.guardarStorage( id, this.token, this.usuario );

          Swal.fire({
            title: 'Imagen de usuario actualizada',
            text: this.usuario.nombre,
            icon: 'success',
            confirmButtonText: 'Bien!'
          });

        })
        .catch( resp => {
          console.log(resp);
        });

    }


}
