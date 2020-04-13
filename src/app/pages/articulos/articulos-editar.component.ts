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

@Component({
  selector: 'app-articulos-editar',
  templateUrl: './articulos-editar.component.html',
  styles: []
})
export class ArticulosEditarComponent implements OnInit {

  id: string;

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

  constructor( public _articulosService: ArticuloService,
               public _marcasService: MarcaService,
               public activatedRoute: ActivatedRoute ) {

    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
    });

    this.obtenerArticulo();
    this.cargarMarcas();

  }

  ngOnInit(): void {
  }


  obtenerArticulo() {

    this._articulosService.buscarunArticulo( this.id )
      .subscribe( resp => {

        this.articulo = resp;

        console.log(this.articulo);

      });

  }

  // obtenerMarca( id: string ) {

  //   this._marcasService.buscarunaMarca( id )
  //     .subscribe( resp => {

  //       this.marca = resp;

  //       console.log(this.marca);

  //     });

  // }


  cargarMarcas() {

    this._marcasService.cargarMarcas(0,true)
        .subscribe( resp => {

          this.marcas = resp;

          console.log(this.marcas.marcas);

        });

  }


  editar( forma: NgForm ) {

    console.log(forma.form.value);

  }


}
