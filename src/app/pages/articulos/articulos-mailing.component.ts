import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-articulos-mailing',
  templateUrl: './articulos-mailing.component.html',
  styles: []
})
export class ArticulosMailingComponent implements OnInit {

  usuario: Usuario;
  articulos: any;

  desde: number = 0;
  limite: number = 5;
  totalRegistros: number = 0;
  cargando: boolean = true;
  activo: boolean = true;

  mailing: any;
  totalRegistrosMailing: number = 0;

  constructor( public _articulosService: ArticuloService,
               public router: Router ) { }

  ngOnInit(): void {
    this.cargarArticulos( this.activo );
    this.cargarMailing();
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

  cargarMailing() {

    this.cargando = true;
    this._articulosService.cargarArticulosMailing()
      .subscribe( (resp: any) => {

        this.mailing = resp.articulos;
        this.totalRegistrosMailing = resp.total;
        this.cargando = false;

      });

  }

  async agregar( articulo: Articulo ) {

    if ( articulo.oferta === true ) {
      Swal.fire({
        title: 'Este articulo esta en OFERTA',
        icon: 'warning',
        confirmButtonText: 'Opss!'
      });
      return;
    }

    if ( articulo.superOferta === true ) {
      Swal.fire({
        title: 'Este articulo esta en SUPER-OFERTA',
        icon: 'warning',
        confirmButtonText: 'Opss!'
      });
      return;
    }

    let valor: number;

    let { value: precioMailing } = await Swal.fire({
      title: 'Ingrese el precio del Mailing',
      html: '<h3><strong>PRECIO: </strong>u$s ' + articulo.precio + '</h3>' +
      '<h3><strong>COSTO : </strong>u$s ' + articulo.costo + '</h3>',
      input: 'number',
      inputPlaceholder: 'Ingrese el precio...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un precio';
        }
        valor = Number(value);
        if ( valor < 0 ) {
          return 'No puede ser un valor negativo';
        }
      }
    });


    if (precioMailing) {

      this.mailing.push( articulo );
      this.totalRegistrosMailing = this.mailing.length;

      precioMailing = Number(precioMailing);
      articulo.mailing = true;
      articulo.precioMailing = precioMailing;

      this._articulosService.actualizarArticulo( articulo )
        .subscribe();
    }


  }


  quitar( articulo: Articulo ) {

    const index = this.mailing.map( item => item._id).indexOf(articulo._id);
    this.mailing.splice(index, 1);
    this.totalRegistrosMailing = this.mailing.length;

    articulo.mailing = false;

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
