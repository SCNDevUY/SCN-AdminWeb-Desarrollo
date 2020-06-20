import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Modelo
import { SubCategoria } from '../models/subcategoria.model';

// Configuraciones
import { URL_SERVICIOS } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  subcategoria: SubCategoria;
  token: string;

  constructor( public http: HttpClient ) {

  }

    // Obtener subcategorias
    cargarSubCategorias( desde: number = 0, limite: number = 5, activo: boolean = true ) {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/subcategorias?activo=' + activo + '&desde=' + desde + '&limite=' + limite + '&token=' + this.token;

      return this.http.get( url );

    }


    // Crear subcategoria
    crearSubCategoria( subcategoria: SubCategoria) {

        this.token = localStorage.getItem('token');

        let url = URL_SERVICIOS + '/subcategorias';
        url += '?token=' + this.token;

        return this.http.post( url, subcategoria );
    }


     // Actualizar subcategoria
     actualizarSubCategoria( subcategoria: SubCategoria ) {

      this.token = localStorage.getItem('token');

      let url = URL_SERVICIOS + '/subcategorias/' + subcategoria._id;
      url += '?token=' + this.token;

      return this.http.put( url, subcategoria );

    }


       // Buscar subcategorias
       buscarSubCategorias( termino: string ) {

        const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

        return this.http.get( url )
            .pipe(
              map( (resp: any) => resp.subcategorias )
            );

      }


    // Borrar subcategorias
    borrarSubCategoria( subcategoria: SubCategoria ) {

      this.token = localStorage.getItem('token');
      const url = URL_SERVICIOS + '/subcategorias/' + subcategoria._id + '?token=' + this.token;

      return this.http.delete( url );

    }

}
