import { Injectable } from '@angular/core';

import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalesService {

  token: string;

  constructor( public http: HttpClient ) {
  }


  cargarConfiguracion() {

    this.token = localStorage.getItem('token');
    const url = URL_SERVICIOS + '/global?token=' + this.token;

    return this.http.get( url );

  }


}
