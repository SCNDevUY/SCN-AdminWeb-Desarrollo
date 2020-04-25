import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-articulos-slideshow',
  templateUrl: './articulos-slideshow.component.html',
  styles: []
})
export class ArticulosSlideshowComponent implements OnInit {

  usuario: Usuario;
  articulos: any;

  desde: number = 0;
  limite: number = 5;

  totalRegistros: number = 0;
  cargando: boolean = true;
  activo: boolean = true;

  slideshow: any;
  totalRegistrosSlideshow: number = 0;

  constructor( public _articulosService: ArticuloService,
               public _modalUploadService: ModalUploadService,
               public router: Router ) { }

  ngOnInit(): void {
    this.cargarArticulos( this.activo );
    this.cargarSlideshow();
    this.usuario = JSON.parse( localStorage.getItem('usuario') );

  }



  cargarArticulos( activo: boolean = true ) {

    this.cargando = true;

    this._articulosService.cargarArticulos( this.desde, this.limite, activo )
      .subscribe( (resp: any) => {

        this.articulos = resp.articulos;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }

  cargarSlideshow() {

    this.cargando = true;
    this._articulosService.cargarArticulosSlideshow()
      .subscribe( (resp: any) => {

        this.slideshow = resp.articulos;
        this.totalRegistrosSlideshow = resp.total;
        this.cargando = false;

      });

  }

  async agregar( articulo: Articulo ) {


      this._modalUploadService.mostrarModal( 'slideshow', articulo );

      this.slideshow.push( articulo );
      this.totalRegistrosSlideshow = this.slideshow.length;

      articulo.slideShow = true;

      this._articulosService.actualizarArticulo( articulo )
        .subscribe();

  }


  quitar( articulo: Articulo ) {

    const index = this.slideshow.map( item => item._id).indexOf(articulo._id);
    this.slideshow.splice(index, 1);
    this.totalRegistrosSlideshow = this.slideshow.length;

    articulo.slideShow = false;

    this._articulosService.actualizarArticulo( articulo )
      .subscribe( resp => {

        this.cargarArticulos();

      });


  }


  buscarArticulo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarArticulos();
      return;
    }

    this.cargando = true;

    this._articulosService.buscarArticulos( termino, this.activo )
      .subscribe( resp => {

        this.articulos = resp;
        this.cargando = false;

      });

  }


  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarArticulos( this.activo );

  }


  volver() {
    this.router.navigate([ '/articulos' ]);
  }

}