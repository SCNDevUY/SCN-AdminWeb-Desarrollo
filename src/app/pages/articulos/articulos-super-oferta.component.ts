import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { ArticuloService } from '../../services/articulo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-super-oferta',
  templateUrl: './articulos-super-oferta.component.html',
  styles: []
})
export class ArticulosSuperOfertaComponent implements OnInit {

  usuario: Usuario;
  articulos: any;

  desde: number = 0;
  limite: number = 5;

  totalRegistros: number = 0;
  cargando: boolean = true;
  activo: boolean = true;

  superOferta: Articulo;
  totalRegistrosSuperOferta: number = 0;

  constructor( public _articulosService: ArticuloService,
               public router: Router ) { }

  ngOnInit(): void {
    this.cargarArticulos( this.activo );

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

    this.cargarSuperOferta();

  }

  cargarSuperOferta() {

    this.cargando = true;
    this._articulosService.cargarArticulosSuperOferta()
      .subscribe( (resp: any) => {

        this.superOferta = resp.articulos[0];
        this.totalRegistrosSuperOferta = resp.total;
        this.cargando = false;
      });

  }



  async agregar( articulo: Articulo ) {

    if ( this.totalRegistrosSuperOferta > 0 ) {
      Swal.fire({
        title: 'Ya existe una Super Oferta activa',
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

    if ( articulo.oferta === true ) {
      Swal.fire({
        title: 'Este articulo esta en OFERTA',
        icon: 'warning',
        confirmButtonText: 'Opss!'
      });
      return;
    }

    let titular;
    let valor;

    const { value: precioOferta } = await Swal.fire({
      title: 'Super Oferta',
      html: '<h3><strong>PRECIO: </strong>u$s ' + articulo.precio + '.00 iva inc</h3>' +
      '<h3><strong>COSTO : </strong>u$s ' + articulo.costo + ' + iva</h3>' +
      '<br>' +
      '<p>Ingrese un Titular</p>' +
      '<input id="descripcion" class="swal2-input" placeholder="Titular...">' +
      '<p>Ingrese el precio</p>' +
      '<input id="precio" class="swal2-input" placeholder="Precio...">' ,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return [
          titular = document.getElementById('descripcion'),
          valor = document.getElementById('precio')
        ];
      }
    });

    if (precioOferta) {

      if ( titular.value.length <= 0 ) {
        Swal.fire({
          title: 'Debe ingresar un Titular',
          icon: 'warning',
          confirmButtonText: 'Opss!'
        });
        return;
      }

      if ( valor.value.length <= 0 ) {
        Swal.fire({
          title: 'Debe ingresar un Precio',
          icon: 'warning',
          confirmButtonText: 'Opss!'
        });
        return;
      }

      articulo.superOferta = true;
      articulo.precioSuperOferta = Number(valor.value);
      articulo.descripcionSuperOferta = titular.value;

      this._articulosService.actualizarArticulo( articulo )
        .subscribe( resp => {

          this.cargarArticulos();

        });


    }


  }


  quitar( articulo: Articulo ) {

    // const index = this.ofertas.map( item => item._id).indexOf(articulo._id);
    // this.ofertas.splice(index, 1);
    // this.totalRegistrosOfertas = this.ofertas.length;

    articulo.superOferta = false;

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
