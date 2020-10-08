import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-inicio',
  templateUrl: './articulos-inicio.component.html',
  styles: []
})
export class ArticulosInicioComponent implements OnInit {

  usuario: Usuario;
  articulos: any;

  desde: number = 0;
  limite: number = 5;

  totalRegistros: number = 0;
  cargando: boolean = true;
  activo: boolean = true;

  inicio: any;
  totalRegistrosInicio: number = 0;

  constructor( public _articulosService: ArticuloService,
               public router: Router ) { }

  ngOnInit(): void {
    this.cargarArticulos( this.activo );
    this.cargarInicio();
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

  cargarInicio() {

    this.cargando = true;
    this._articulosService.cargarArticulosInicio()
      .subscribe( (resp: any) => {

        this.inicio = resp.articulos;
        this.totalRegistrosInicio = resp.total;
        this.cargando = false;

      });

  }

  agregar( articulo: Articulo ) {

    if ( this.totalRegistrosInicio === 12 ) {
      Swal.fire({
        title: 'No pueden haber mas de 8 articulos',
        icon: 'warning',
        confirmButtonText: 'Opss!'
      });
      return;
    }

    articulo.inicio = true;

    this._articulosService.actualizarArticulo( articulo )
        .subscribe( resp => {

          this.cargarInicio();

        });

  }


  quitar( articulo: Articulo ) {

    const index = this.inicio.map( item => item._id).indexOf(articulo._id);
    this.inicio.splice(index, 1);
    this.totalRegistrosInicio = this.inicio.length;

    articulo.inicio = false;

    this._articulosService.actualizarArticulo( articulo )
      .subscribe( resp => {

        this.cargarArticulos();

      });


  }




  buscarArticulo( termino: string, activo: boolean ) {

    if ( termino.length <= 0 ) {
      this.cargarArticulos();
      return;
    }

    this.cargando = true;

    this._articulosService.buscarArticulos( termino, activo )
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
