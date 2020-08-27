import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Configuraciones
import { URL_SERVICIOS } from '../config/config';
// import { NIFELCO_USUARIO } from '../config/config';
// import { NIFELCO_PASSWORD } from '../config/config';

// Servicios
import { GlobalesService } from './globales.service';

@Injectable({
  providedIn: 'root'
})
export class NifelcoService {

    NIFELCO_USUARIO: string;
    NIFELCO_PASSWORD: string;

  constructor( public http: HttpClient,
               public globalesService: GlobalesService ) {

                this.globalesService.cargarConfiguracion()
                    .subscribe( (resp: any) => {

                        // console.log( resp );
                        this.NIFELCO_USUARIO = resp.global[0].usuarioNifelco;
                        this.NIFELCO_PASSWORD = resp.global[0].passwordNifelco;

                    });

                }


    // Obtener marcas
    cargarMarcas( codMarca: number ) {

        const url = URL_SERVICIOS
                    + '/nifelco/marcas?usuario=' + this.NIFELCO_USUARIO
                    + '&password=' + this.NIFELCO_PASSWORD
                    + '&codMarca=' + codMarca ;

        return this.http.post( url, null );

    }


    // Obtener Grupo de Articulos
    cargarGrupoArticulos( grupoPadre: string ) {

        const url = URL_SERVICIOS
                    + '/nifelco/grupoarticulos?usuario=' + this.NIFELCO_USUARIO
                    + '&password=' + this.NIFELCO_PASSWORD
                    + '&grupoPadre=' + grupoPadre;

        return this.http.post( url, null );

    }


    // Obtener lista de Articulos
    cargarListaArticulos( palabras: string, codigoGrupo: string, codigoMarca: number ) {

        const url = URL_SERVICIOS
                    + '/nifelco/listaarticulos?usuario=' + this.NIFELCO_USUARIO
                    + '&password=' + this.NIFELCO_PASSWORD
                    + '&palabras=' + palabras
                    + '&codigoGrupo=' + codigoGrupo
                    + '&codigoMarca=' + codigoMarca;

        return this.http.post( url, null );

    }



    // Obtener imagen de Articulo
    cargarImagenArticulo( codigo: string, tamanio: string ) {

        const url = URL_SERVICIOS
                    + '/nifelco/imagenarticulo?usuario=' + this.NIFELCO_USUARIO
                    + '&password=' + this.NIFELCO_PASSWORD
                    + '&codigo=' + codigo
                    + '&tamanio=' + tamanio;

        return this.http.post( url, null );

    }



}
