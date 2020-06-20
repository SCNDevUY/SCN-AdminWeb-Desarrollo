import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Configuraciones
import { URL_SERVICIOS } from '../config/config';
import { NIFELCO_USUARIO } from '../config/config';
import { NIFELCO_PASSWORD } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class NifelcoService {

  constructor( public http: HttpClient ) { }


    // Obtener marcas
    cargarMarcas( codMarca: number ) {

        const url = URL_SERVICIOS
                    + '/nifelco/marcas?usuario=' + NIFELCO_USUARIO
                    + '&password=' + NIFELCO_PASSWORD
                    + '&codMarca=' + codMarca ;

        return this.http.post( url, null );

    }


    // Obtener Grupo de Articulos
    cargarGrupoArticulos( grupoPadre: string ) {

        const url = URL_SERVICIOS
                    + '/nifelco/grupoarticulos?usuario=' + NIFELCO_USUARIO
                    + '&password=' + NIFELCO_PASSWORD
                    + '&grupoPadre=' + grupoPadre;

        return this.http.post( url, null );

    }


    // Obtener lista de Articulos
    cargarListaArticulos( palabras: string, codigoGrupo: string, codigoMarca: number ) {

        const url = URL_SERVICIOS
                    + '/nifelco/listaarticulos?usuario=' + NIFELCO_USUARIO
                    + '&password=' + NIFELCO_PASSWORD
                    + '&palabras=' + palabras
                    + '&codigoGrupo=' + codigoGrupo
                    + '&codigoMarca=' + codigoMarca;

        return this.http.post( url, null );

    }



    // Obtener imagen de Articulo
    cargarImagenArticulo( codigo: string, tamanio: string ) {

        const url = URL_SERVICIOS
                    + '/nifelco/imagenarticulo?usuario=' + NIFELCO_USUARIO
                    + '&password=' + NIFELCO_PASSWORD
                    + '&codigo=' + codigo
                    + '&tamanio=' + tamanio;

        return this.http.post( url, null );

    }



}
