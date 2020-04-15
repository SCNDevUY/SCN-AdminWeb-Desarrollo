import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-activos',
  templateUrl: './articulos-activos.component.html',
  styles: []
})
export class ArticulosActivosComponent implements OnInit {

  usuario: Usuario;
  articulos: any[];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  activos: boolean = true;

  activo: boolean = true;
  titulo: string = 'Activos';

  constructor( public _articulosService: ArticuloService,
               public _modalUploadService: ModalUploadService,
               public activatedRoute: ActivatedRoute,
               public router: Router ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.activo = params.activo;
      this.titulo = params.titulo;

      this.cargarArticulos( this.activo );
      this.usuario = JSON.parse( localStorage.getItem('usuario') );

    });

  }


  cargarArticulos( activo: boolean = true ) {

    this.cargando = true;

    if ( activo === true ) {
      this.activos = true;
    } else {
      this.activos = false;
    }

    this._articulosService.cargarArticulos( this.desde, activo )
      .subscribe( (resp: any) => {

        this.articulos = resp.articulos;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }


  editarArticulo( id: string ) {

    this.router.navigate([ '/articulosEditar', id ]);

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
    this.cargarArticulos( this.activo );

  }


  volver() {
    this.router.navigate([ '/articulos' ]);
  }

}
