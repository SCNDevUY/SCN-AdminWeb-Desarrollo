import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
export class ArticulosEditarComponent implements OnInit {

  id: string;

  imgArticulo: string;
  subcategorias: string;

  articulo: any = {
      codigoInterno: 0,
      nombre: '',
      precio: 0,
      stock: 0,
      costo: 0,
      usuario: {
        nombre: ''
      },
      marca: {
          nombre: '',
          img: '',
          imgNombre: '',
          _id: ''
      },
      categoria: {
          nombre: '',
          _id: ''
      },
      subcategoria: [{
        nombre: '',
        _id: ''
      }],
      descripcion: '',
      nuevo: true
  };

  marcas: any = {};

  categorias: any = {
    ok: true,
    total: 0,
    categorias: []
  };


  constructor( public _articulosService: ArticuloService,
               public _marcasService: MarcaService,
               public _categoriasService: CategoriaService,
               public activatedRoute: ActivatedRoute ) {

    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
    });

    this.obtenerArticulo();
    this.cargarMarcas();
    this.cargarCategorias();

  }

  ngOnInit(): void {
  }


  obtenerArticulo() {

    this._articulosService.buscarunArticulo( this.id )
      .subscribe( resp => {

        this.articulo = resp;

        this.imgArticulo = this.articulo.marca.img;
        // console.log(this.articulo);

      });

  }


  cargarMarcas() {

    this._marcasService.cargarMarcas(0,true)
    .subscribe( resp => {
        this.marcas = resp;
    });
  }


  cargarCategorias() {

    this._categoriasService.cargarCategorias(0, true)
    .subscribe( resp => {

      this.categorias = resp;

      console.log(this.categorias.categorias);

    });
  }

  cambiarSubCategorias( event ) {

   // this.categorias.categorias.includes(event)

    console.log(event);

  }

  cambiarImagen( event ) {
    this.imgArticulo = event[0].id;
  }


  editar( forma: NgForm ) {
    console.log(forma.form.value);
  }


}
