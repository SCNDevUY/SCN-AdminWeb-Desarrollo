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

  cotizacion: number = 0;

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

    this.archivoSubir = archivo;

  }


  cargarArchivo() {

    if ( this.cotizacion <= 0 ) {

      Swal.fire(
        'Atencion!',
        'Debe de ingresar la cotizacion del Dolar',
        'warning'
      );
      return;
    }

    if ( !this.archivoSubir ) {

      Swal.fire(
        'Atencion!',
        'Debe de seleccionar un archivo',
        'warning'
      );
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

          this._articuloService.cargarArchivo( this.archivoSubir )
          .subscribe( (resp: any) => {

            this.articulosArchivo = resp.articulos;
            this.totalRegistrosArchivo = resp.total;

            console.log( this.articulosArchivo );


            this._articuloService.cargarArticulosTodos()
              .subscribe( (resp2: any) => {

                console.log(resp2);
                this.articulos = resp2.articulos;

                this.articulosArchivo.forEach( art => {

                  // const codInt = Number(art.codigoInterno);

                  const index = this.articulos.map( item => item.codigoInterno ).indexOf( Number(art.codigoInterno) );
                  if ( index === -1 ) {
                      this.articulosNuevos ++;

                      const costoTmp = (art.costo / this.cotizacion) * 1.22;
                      let precioTmp = ( costoTmp * 1.30 ) * 1.22;

                      // Quita decimales
                      precioTmp = Number( precioTmp.toFixed(0) );
                      // transforma el ultimo numero en un 9
                      let precioTmp2 = String(precioTmp);
                      precioTmp2 = precioTmp2.slice( 0, -1 );
                      precioTmp2 = precioTmp2 + '9';
                      precioTmp = Number(precioTmp2);


                      // TODO falta agregar el costo en $
                      const articuloCrear: Articulo = {
                        codigoInterno: art.codigoInterno,
                        nombre:        art.nombre,
                        costo:         Number( costoTmp.toFixed(2) ),
                        precio:        precioTmp,
                        stock:         art.stock
                      };

                      console.log(articuloCrear);

                      // TODO falta actualizar la DB
                      // this._articuloService.crearArticulo()


                  } else {

                    // TODO si el costo en $ es igual no actualizar costo ni venta , solo nombre y stock

                    this.articulosModificados ++;

                    // TODO falta actualizar la DB
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
