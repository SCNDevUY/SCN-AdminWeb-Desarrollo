import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// Servicios
import { ArticulosCargarService } from '../../services/articulos-cargar.service';
import { ArticuloService } from '../../services/articulo.service';

@Component({
  selector: 'app-articulos-cargar',
  templateUrl: './articulos-cargar.component.html',
  styles: []
})
export class ArticulosCargarComponent implements OnInit {

  cargando = false;

  cargados = false;

  articulos = [];
  totalRegistros = 0;

  archivoSubir: File;

  constructor( public _articulosCargarService: ArticulosCargarService,
               public _articuloService: ArticuloService ) { }

  ngOnInit(): void {
  }


  seleccionArchivo( archivo: File ) {

    if ( !archivo ) {
      this.archivoSubir = null;
      return;
    }

    if ( archivo.type !== 'application/vnd.ms-excel' ) {
        Swal.fire({
          title: 'Solo archivos .CSV',
          text: 'El archivo seleccionado no es un formato valido',
          icon: 'error',
          confirmButtonText: 'Atencion!'
        });
        this.archivoSubir = null;
        return;
    }

    Swal.fire({
      title: 'Atencion!',
      text: 'Esta seguro de cargar los articulos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {

          this.cargados = true;
          this.cargando = true;

          this._articuloService.cargarArchivo( archivo )
          .subscribe( (resp: any) => {

            console.log(resp);
            this.articulos = resp.articulos;
            this.totalRegistros = resp.total;

            this.cargando = false;

            Swal.fire(
              'Cargados!',
              'Articulos cargados con exito.',
              'success'
            );

          });

        }
      });

  }




}
