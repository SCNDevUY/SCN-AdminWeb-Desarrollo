import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Modelo
import { Categoria } from '../../models/categoria.model';

// Configuraciones
import { URL_SERVICIOS } from '../../config/config';
import { SubcategoriaService } from '../../services/subcategoria.service';


@Injectable({
  providedIn: 'root'
})
export class ModalSubcategoriasService {

  public categoria: Categoria = { nombre: 'Sin Nombre', activo: true, subcategorias: [], _id: '123456' };

  public subcategorias = [];

  public oculto: string = 'oculto';

  subcategoriasdeSubcategorias = [];

  token: string;

  desde: number = 0;
  totalRegistros: number = 0;

  constructor( public http: HttpClient,
               public _subCategoriaService: SubcategoriaService ) {
  }


        // Actualizar subcategorias de una categoria
        actualizarSubCategoriasXcategoria( id: string, subcategoria ) {

          this.token = localStorage.getItem('token');

          let url = URL_SERVICIOS + '/categorias/subcategoria/' + id;
          url += '?token=' + this.token;

          return this.http.put( url, subcategoria );

        }



        ocultarModal() {
          this.oculto = 'oculto';
          this.subcategorias = [];
          this.subcategoriasdeSubcategorias = [];
        }



        mostrarModal( categoria: Categoria ) {
          this.oculto = '';
          this.categoria = categoria;



          this.categoria.subcategorias.forEach( subcat => {
            this.subcategorias.push(subcat);
          });

          this.cargarSubCategorias( true );


        }


        // Cargar
        cargarSubCategorias( activo: boolean = true ) {

          this._subCategoriaService.cargarSubCategorias( this.desde, activo )
            .subscribe( (resp: any) => {

              this.subcategoriasdeSubcategorias = resp.subCategorias;
              this.totalRegistros = resp.total;


              this.subcategorias.forEach( subcat => {

                const index = this.subcategoriasdeSubcategorias.map( item => item.nombre).indexOf(subcat.nombre);

                this.subcategoriasdeSubcategorias.splice(index, 1);

              });

            });
        }


}
