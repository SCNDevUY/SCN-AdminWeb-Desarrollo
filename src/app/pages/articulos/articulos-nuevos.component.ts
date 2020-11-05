import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-nuevos',
  templateUrl: './articulos-nuevos.component.html',
  styles: []
})
export class ArticulosNuevosComponent implements OnInit {

  usuario: Usuario;
  articulos: any[];
  desde: number = 0;
  limite: number = 25;

  totalRegistros: number = 0;
  cargando: boolean = true;

  activos: boolean = true;

  activo: boolean = true;
  titulo: string = 'Activos';

  constructor( public _articulosService: ArticuloService,
               public _modalUploadService: ModalUploadService,
               public router: Router ) { }

  ngOnInit(): void {
      this.cargarArticulos();
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
  }


  cargarArticulos() {

    this.cargando = true;

    this._articulosService.cargarArticulosNuevos( this.desde, this.limite )
      .subscribe( (resp: any) => {

        this.articulos = resp.articulos;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }


  editarArticulo( id: string ) {

    this.router.navigate([ '/articulosEditar', id ]);

  }


  buscarArticulo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarArticulos();
      return;
    }

    this.cargando = true;

    this._articulosService.buscarArticulosNuevos( termino )
      .subscribe( resp => {

        this.articulos = resp;
        this.cargando = false;

      });

  }


  mostrarModal( articulo: Articulo ) {
    this._modalUploadService.mostrarModal( 'articulos', articulo );
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
    this.cargarArticulos();

  }


  volver() {
    this.router.navigate([ '/articulos' ]);
  }
}
