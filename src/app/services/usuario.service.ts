import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { URL_SERVICIOS } from '../config/config';

import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router ) {
    console.log('Servicio de usuario listo!');
    this.cargarStorage();
   }

  estaLogueado() {
      if ( this.token.length > 5 ) {
        return true;
      } else {
        return false;
      }
  }

  cargarStorage() {

      if ( localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse( localStorage.getItem('usuario') );
      } else {
        this.token = '';
        this.usuario = null;
      }
  }

   guardarStorage( id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;
   }

   logout() {
      this.token = '';
      this.usuario = null;
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      this.router.navigate(['/login']);
   }

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


}
