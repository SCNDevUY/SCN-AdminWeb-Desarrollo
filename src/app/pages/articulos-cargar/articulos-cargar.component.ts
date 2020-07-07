import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// Servicios
import { ArticulosCargarService } from '../../services/articulos-cargar.service';
import { ArticuloService } from '../../services/articulo.service';

// Modelos
import { Articulo } from '../../models/articulo.model';

@Component({
  selector: 'app-articulos-cargar',
  templateUrl: './articulos-cargar.component.html',
  styles: []
})
export class ArticulosCargarComponent implements OnInit {

  cargando = false;

  cargados = false;

  articulosArchivo = [];
  totalRegistrosArchivo = 0;

  articulos: Articulo[];

  archivoSubir: File;

  articulosNuevos = 0;
  articulosModificados = 0;

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

            this.articulosArchivo = resp.articulos;
            this.totalRegistrosArchivo = resp.total;

            console.log( this.articulosArchivo );


            this._articuloService.cargarArticulosTodos()
              .subscribe( (resp2: any) => {

                console.log(resp2);
                this.articulos = resp2.articulos;

                this.articulosArchivo.forEach( art => {

                  const index = this.articulos.map( item => item.codigoInterno ).indexOf( art.codigoInterno );
                  if ( index === -1 ) {
                      console.log('No existe');
                      this.articulosNuevos ++;
                  } else {
                    console.log('Existe articulo: ', art.codigoInterno );
                    this.articulosModificados ++;
                  }

                });


                this.cargando = false;

                Swal.fire(
                  'Cargados!',
                  'Articulos cargados con exito.',
                  'success'
                );

              });
          });
        }
      });

  }




}
