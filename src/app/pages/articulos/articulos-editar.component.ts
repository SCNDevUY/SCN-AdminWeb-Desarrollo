import { Component } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

// Firebase
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Marca } from '../../models/marca.model';
import { Categoria } from '../../models/categoria.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';
import { MarcaService } from '../../services/marca.service';
import { CategoriaService } from '../../services/categoria.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

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
               public _modalUploadService: ModalUploadService,
               public activatedRoute: ActivatedRoute,
               public router: Router,
               private storage: AngularFireStorage, ) {

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


  mostrarModal( articulo: Articulo ) {
    this._modalUploadService.mostrarModal( 'articulos', articulo );
  }

  eliminarImagen( articulo: any, idx: number ) {

    let imgTmp = [];
    imgTmp = articulo.imagenes;

    if ( articulo.imagenes.length >= 2 ) {
      if ( articulo.imagenes[idx].principal ) {
        if ( articulo.imagenes.length >= 2 && idx === 0 ) {
          imgTmp[1].principal = true;
        } else {
          imgTmp[0].principal = true;
        }
      }
    }

    const imagenBorrada = imgTmp.splice( idx, 1 );
    articulo.imagenes = imgTmp;

    this._articulosService.actualizarArticulo( articulo )
      .subscribe( resp => {

        // Borro archivo de Firebase
        const storageRef = firebase.storage().ref();
        storageRef.child(`articulos/${ imagenBorrada[0].nombre }`)
        .delete();

        Swal.fire({
          title: 'Imagen Eliminada',
          text: this.articulo.nombre,
          icon: 'success',
          confirmButtonText: 'Bien!'
        });

      });

  }


  cambiarImagenPrincipal( articulo: any, idx: number ) {

    if ( articulo.imagenes[idx].principal ) {
      return;
    }

    let imgTmp = [];
    imgTmp = articulo.imagenes;
    imgTmp.forEach( ( img: any, index ) => {

      if ( index === idx ) {
          imgTmp[index].principal = true;
      } else {
        imgTmp[index].principal = false;
      }

    });

    this.articulo.imagenes = imgTmp;

    this._articulosService.actualizarArticulo( this.articulo )
    .subscribe( resp => {

    });

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


  agregarVariante() {

    const codigoInternoCortado = Number(this.articulo.codigoInterno.toString().slice(0, -2));
    console.log(codigoInternoCortado);

    this._articulosService.cargarArticuloXcodigoInerno( codigoInternoCortado )
        .subscribe( resp => {

          console.log(resp);

        });

  }

}
