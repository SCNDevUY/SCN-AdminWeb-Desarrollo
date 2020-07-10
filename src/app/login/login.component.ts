import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

import { CLIENT_ID } from '../config/config';

declare function init_plugins();

// Google LogIn
// Aca le digo a TypeScript... 
// Ok no hay problema confia en mi, se lo que hago, existe una propiedad llamada gapi...
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  // Google LogIn
  auth2: any;

  constructor( public router: Router,
               public _usuarioService: UsuarioService ) {}


  ngOnInit(): void {

    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

  }

  googleInit() {

    gapi.load('auth2', () => {

        this.auth2 = gapi.auth2.init({
          client_id: CLIENT_ID,
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        this.attachSigin( document.getElementById('btnGoogle') );

    });
  }

  attachSigin( element ) {

      this.auth2.attachClickHandler( element, {}, (googleUser) => {

        // Para ver el Profile del usuario que hizo login con google
        // const profile = googleUser.getBasicProfile();
        const token = googleUser.getAuthResponse().id_token;
        // console.log(token);

        this._usuarioService.loginGoogle( token )
          .subscribe( () => window.location.href = '#/dashboard' );
      });

  }


  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario( null, null, forma.value.email, forma.value.password );

    this._usuarioService.login( usuario, forma.value.recuerdame )
        .subscribe( ( resp) => {
          this.router.navigate([ '/dashboard' ]);
        }, err => {

        });

  }

}
