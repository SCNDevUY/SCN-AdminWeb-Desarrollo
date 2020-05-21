import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuracion
import { URL_SERVICIOS } from '../config/config';

// Modelo
import { Global } from '../models/global.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalesService {

  token: string;

  constructor( public http: HttpClient ) {
  }


  cargarConfiguracion() {

    const url = URL_SERVICIOS + '/global';
    return this.http.get( url );

  }

  guardarConfiguracion( conf: Global, id: string ) {

    this.token = localStorage.getItem('token');

    const url = URL_SERVICIOS + '/global/' + id + '?token=' + this.token;
    return this.http.put( url, conf );

  }


}
