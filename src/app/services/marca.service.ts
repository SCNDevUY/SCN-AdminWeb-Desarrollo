import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Modelo
import { Marca } from '../models/marca.model';

// configuraciones
import { URL_SERVICIOS } from '../config/config';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  marca: Marca;
  token: string;

  constructor( public http: HttpClient ) {

  }


    cargarMarcas( desde: number = 0, activo: boolean = true ) {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/marca?activo=' + activo + '&desde=' + desde + '&token=' + this.token;

      return this.http.get( url );

    }



     // Actualizar marca
    actualizarMarca( marca: Marca ) {

      this.token = localStorage.getItem('token');

      let url = URL_SERVICIOS + '/marca/' + marca._id;
      url += '?token=' + this.token;

      return this.http.put( url, marca );

    }

    buscarMarcas( termino: string ) {

      const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

      return this.http.get( url )
          .pipe(
            map( (resp: any) => resp.marcas )
          );

    }

    borrarMarca( id: string ) {

      this.token = localStorage.getItem('token');

      const url = URL_SERVICIOS + '/marca/' + id + '?token=' + this.token;
      return this.http.delete( url );

    }




}
