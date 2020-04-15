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
  articulos: any[];

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  activo: boolean = true;

  mailing: any[] = [];
  totalRegistrosMailing: number = 0;

  constructor( public _articulosService: ArticuloService,
               public router: Router ) { }

  ngOnInit(): void {
    this.cargarArticulos( this.activo );
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
  }

  cargarArticulos( activo: boolean = true ) {

    this.cargando = true;

    this._articulosService.cargarArticulos( this.desde, activo )
      .subscribe( (resp: any) => {

        this.articulos = resp.articulos;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }

  agregar( articulo: Articulo ) {

    this.mailing.push( articulo );
    this.totalRegistrosMailing = this.mailing.length;

    const index = this.articulos.map( item => item._id).indexOf(articulo._id);
    this.articulos.splice(index, 1);
    this.totalRegistros = this.articulos.length;

  }

  quitar( articulo: Articulo ) {


    this.articulos.push( articulo );
    this.totalRegistros = this.articulos.length;

    const index = this.mailing.map( item => item._id).indexOf(articulo._id);
    this.mailing.splice(index, 1);
    this.totalRegistrosMailing = this.mailing.length;

  }


}
