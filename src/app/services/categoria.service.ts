import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Modelo
import { Categoria } from '../models/categoria.model';

// Configuraciones
import { URL_SERVICIOS } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoria: Categoria;
  token: string;

  constructor( public http: HttpClient ) {

  }

        // Obtener categorias
        cargarCategorias( desde: number = 0, activo: boolean = true ) {

          this.token = localStorage.getItem('token');
          const url = URL_SERVICIOS + '/categorias?activo=' + activo + '&desde=' + desde + '&token=' + this.token;

          return this.http.get( url );

        }


        // Crear categoria
        crearCategoria( categoria: Categoria) {

          this.token = localStorage.getItem('token');

          let url = URL_SERVICIOS + '/categorias';
          url += '?token=' + this.token;

          return this.http.post( url, categoria );
        }


        // Actualizar categoria
        actualizarCategoria( categoria: Categoria ) {

          this.token = localStorage.getItem('token');

          let url = URL_SERVICIOS + '/categorias/' + categoria._id;
          url += '?token=' + this.token;

          return this.http.put( url, categoria );

        }


        // Buscar subcategorias
        buscarCategorias( termino: string ) {

          const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

          return this.http.get( url )
              .pipe(
                map( (resp: any) => resp.categorias )
              );

        }


        // Borrar categorias
        borrarCategoria( categoria: Categoria ) {

          this.token = localStorage.getItem('token');
          const url = URL_SERVICIOS + '/categorias/' + categoria._id + '?token=' + this.token;

          return this.http.delete( url );

        }


}
