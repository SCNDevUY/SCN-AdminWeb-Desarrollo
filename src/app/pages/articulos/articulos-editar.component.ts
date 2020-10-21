import { Component } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Marca } from '../../models/marca.model';
import { Categoria } from '../../models/categoria.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';
import { MarcaService } from '../../services/marca.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-articulos-editar',
  templateUrl: './articulos-editar.component.html',
  styles: []
})
export class ArticulosEditarComponent {

  id: string;

  imgArticulo: string = '';
  eligioMarca: boolean = false;

  muestroActivo: boolean = false;

  articulo: any = {
    codigoInterno: 0,
    nombre: '',
    precio: 0,
    stock: 0,
    costo: 0,
    codigoProveedor: '',
    marca: {
      nombre: '',
      img: ''
    },
    subcategoria: [],
    categoria: {
      nombre: ''
    }
  };

  marcas: any = {};
  categorias: any = {};
  subcategorias = [];
  subcategoriasTemp = [];



  constructor( public _articulosService: ArticuloService,
               public _marcasService: MarcaService,
               public _categoriasService: CategoriaService,
               public activatedRoute: ActivatedRoute,
               public router: Router, ) {

    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
    });

    this.obtenerArticulo();
    this.cargarMarcas();
    this.cargarCategorias();

  }

  cambioContenido( event: any ) {
    this.articulo.descripcion = event.html;
  }

  obtenerArticulo() {

    this._articulosService.buscarunArticulo( this.id )
      .subscribe( resp => {

        this.articulo = resp;

        if ( this.articulo.nuevo === false ) {

            this.muestroActivo = true;

        }

      });

  }


  cargarMarcas() {

    this._marcasService.cargarMarcas( 0, 0, true )
    .subscribe( resp => {
        this.marcas = resp;
    });
  }


  cargarCategorias() {

    this._categoriasService.cargarCategorias(0, true)
    .subscribe( resp => {

      this.categorias = resp;

    });
  }

  cargarSubCategorias( idCategoria: string ) {

    for ( const categoria of this.categorias.categorias ) {

      if ( categoria._id === idCategoria ) {
        this.subcategorias = categoria.subcategorias;
      }

    }

    this.subcategoriasTemp = [];

  }

  subCat( idSubCat: string ) {

    if ( !this.subcategoriasTemp.includes( idSubCat ) ) {

      this.subcategoriasTemp.push( idSubCat );

    } else {

      // Borrar
      const index = this.subcategoriasTemp.map( item => item).indexOf(idSubCat);

      this.subcategoriasTemp.splice(index, 1);

    }

    this.articulo.subcategoria = this.subcategoriasTemp;

  }

  cambiarImagen( event ) {
    this.eligioMarca = true;
    this.imgArticulo = event[0].id;
  }


  guardar( forma: Form ) {

    if ( this.articulo.nuevo === true ) {
      this.articulo.nuevo = false;
      this.articulo.activo = true;
    }

    this._articulosService.actualizarArticulo( this.articulo )
      .subscribe( resp => {

        Swal.fire({
          title: 'Articulo Actualizado',
          text: this.articulo.nombre,
          icon: 'success',
          confirmButtonText: 'Bien!'
        });

        this.router.navigate([ '/articulos' ]);

      });
  }


  cancelar() {
    this.router.navigate([ '/articulos' ]);
  }


}
