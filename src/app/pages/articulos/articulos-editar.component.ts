import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-articulos-editar',
  templateUrl: './articulos-editar.component.html',
  styles: []
})
export class ArticulosEditarComponent implements OnInit {

  id: string;

  articulo: any = {};

  constructor( public _articulosService: ArticuloService,
               public activatedRoute: ActivatedRoute ) {

    this.activatedRoute.params.subscribe( params => {
      this.id = params.id;
    });

    this.obtenerArticulo();

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


  editar( forma: NgForm ) {

    console.log(forma.form.value);

  }


}
