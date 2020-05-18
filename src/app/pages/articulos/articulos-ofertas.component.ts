import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-ofertas',
  templateUrl: './articulos-ofertas.component.html',
  styles: []
})
export class ArticulosOfertasComponent implements OnInit {

  usuario: Usuario;
  articulos: any;

  desde: number = 0;
  limite: number = 5;

  totalRegistros: number = 0;
  cargando: boolean = true;
  activo: boolean = true;

  ofertas: any;
  totalRegistrosOfertas: number = 0;

  constructor( public _articulosService: ArticuloService,
               public router: Router ) { }

  ngOnInit(): void {
    this.cargarArticulos( this.activo );
    this.cargarOfertas();
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

  cargarOfertas() {

    this.cargando = true;
    this._articulosService.cargarArticulosOfertas()
      .subscribe( (resp: any) => {

        this.ofertas = resp.articulos;
        this.totalRegistrosOfertas = resp.total;
        this.cargando = false;

      });

  }

  async agregar( articulo: Articulo ) {

    if ( articulo.superOferta === true ) {
      Swal.fire({
        title: 'Este articulo esta en la SUPER-OFERTA',
        icon: 'warning',
        confirmButtonText: 'Opss!'
      });
      return;
    }

    if ( articulo.mailing === true ) {
      Swal.fire({
        title: 'Este articulo esta en el MAILING',
        icon: 'warning',
        confirmButtonText: 'Opss!'
      });
      return;
    }


    let valor: number;

    let { value: precioOferta } = await Swal.fire({
      title: 'Ingrese el precio para la Oferta',
      html: '<h3><strong>PRECIO: </strong>u$s ' + articulo.precio + '.00 iva inc</h3>' +
      '<h3><strong>COSTO : </strong>u$s ' + articulo.costo + ' + iva</h3>',
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


    if (precioOferta) {

      this.ofertas.push( articulo );
      this.totalRegistrosOfertas = this.ofertas.length;

      precioOferta = Number(precioOferta);
      articulo.oferta = true;
      articulo.precioOferta = precioOferta;

      this._articulosService.actualizarArticulo( articulo )
        .subscribe();
    }


  }


  quitar( articulo: Articulo ) {

    const index = this.ofertas.map( item => item._id).indexOf(articulo._id);
    this.ofertas.splice(index, 1);
    this.totalRegistrosOfertas = this.ofertas.length;

    articulo.oferta = false;

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
