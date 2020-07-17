import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// Servicios
import { ArticulosCargarService } from '../../services/articulos-cargar.service';
import { ArticuloService } from '../../services/articulo.service';

// Modelos
import { Articulo } from '../../models/articulo.model';
import { nextTick } from 'process';

@Component({
  selector: 'app-articulos-cargar',
  templateUrl: './articulos-cargar.component.html',
  styles: []
})
export class ArticulosCargarComponent implements OnInit {

  cargando = false;

  cargados = false;

  articulosArchivo = [];

  articulos: Articulo[];
  articuloTmp: Articulo;
  articuloTmp2: Articulo;

  archivoSubir: File;

  totalRegistrosArchivo = 0;
  articulosNuevos = 0;
  articulosModificados = 0;
  articulosSoloStock: Articulo[] = [];
  articulosCambioCosto: Articulo[] = [];
  articulosStockCero: Articulo[] = [];

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


            this._articuloService.cargarArticulosTodos()
              .subscribe( (resp2: any) => {

                this.articulos = resp2.articulos;

            // CREO EL ARTICULO NUEVO o ACTUALIZO NOMBRE Y STOCK
                this.articulosArchivo.forEach( async art => {

                  const index = this.articulos.map( item => item.codigoInterno ).indexOf( Number(art.codigoInterno) );

                  if ( index === -1 ) {

                  // ARTICULO NO EXISTE

                      this.articulosNuevos ++;

                      const costoTmp = (art.costoPesos / this.cotizacion);
                      let precioTmp = ( costoTmp * 1.30 ) * 1.22;

                      // Quita decimales
                      precioTmp = Number( precioTmp.toFixed(0) );
                      // transforma el ultimo numero en un 9
                      let precioTmp2 = String(precioTmp);
                      precioTmp2 = precioTmp2.slice( 0, -1 );
                      precioTmp2 = precioTmp2 + '9';
                      precioTmp = Number(precioTmp2);

                      const articuloCrear: Articulo = {
                        codigoInterno: art.codigoInterno,
                        nombre:        art.nombre,
                        costo:         Number( costoTmp.toFixed(2) ),
                        costoPesos:    art.costoPesos,
                        precio:        precioTmp,
                        stock:         art.stock
                      };

                      const artCreado = await this.crearArticulo( articuloCrear );

                  } else {
                  // ARTICULO EXISTE
                    this.articuloTmp = this.articulos[index];

                    // PREGUNTO SI LOS COSTOS PESOS SON IGUALES
                    if ( this.articuloTmp.costoPesos === art.costoPesos ) {

                      if ( this.articuloTmp.stock !== art.stock ) {
                        this.articuloTmp.stock = art.stock;

                        this.articulosSoloStock.push( this.articuloTmp );
                      } else {
                        return;
                      }

                    } else {

                      const costoTmp = (art.costoPesos / this.cotizacion);
                      let precioTmp = ( costoTmp * 1.30 ) * 1.22;

                      // Quita decimales
                      precioTmp = Number( precioTmp.toFixed(0) );
                      // transforma el ultimo numero en un 9
                      let precioTmp2 = String(precioTmp);
                      precioTmp2 = precioTmp2.slice( 0, -1 );
                      precioTmp2 = precioTmp2 + '9';
                      precioTmp = Number(precioTmp2);

                      this.articuloTmp.costo = Number( costoTmp.toFixed(2) );
                      this.articuloTmp.costoPesos = art.costoPesos;
                      this.articuloTmp.precio = precioTmp;
                      this.articuloTmp.stock = art.stock;

                      this.articulosCambioCosto.push( this.articuloTmp );
                    }

                    this.articulosModificados ++;

                    // Actualizar la DB
                    const arctAct = await this.actualizarArticulo( this.articuloTmp );

                  }

                });

            // BUSCO SI ALGUN ARTICULO ESTA CON STOCK 0 y LO DEJO INACTIVO
                this.articulos.forEach( async ( artDb: Articulo ) => {

                  const index = this.articulosArchivo.map( item => Number(item.codigoInterno) ).indexOf( artDb.codigoInterno );
                  if ( index === -1 ) {
                    // NO EXISTE porque tiene stock 0

                    if ( artDb.nuevo === true && artDb.stock === 0 && artDb.activo === false ) {
                      return;
                    } else {
                      artDb.stock = 0;
                      artDb.nuevo = true;
                      artDb.activo = false;
                      artDb.mailing = false;
                      artDb.oferta = false;
                      artDb.superOferta = false;
                      artDb.inicio = false;
                      artDb.slideShow = false;
                      this.articulosStockCero.push( artDb );
                      this.articulosModificados ++;

                      // Actualizar la DB
                      const arctAct = await this.actualizarArticulo( artDb );
                    }
                  } else {
                    return;
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


 async crearArticulo( articuloCrear: Articulo ) {

    return new Promise((resolve, reject) => {

      this._articuloService.crearArticulo( articuloCrear )
        .subscribe( (resp: any) => {

            if ( resp.ok === true ) {
              resolve( true );
            } else {
              reject( false );
            }

        });

    });

  }



  async actualizarArticulo( articuloActualizar ) {

    return new Promise((resolve, reject) => {

      this._articuloService.actualizarArticulo( articuloActualizar )
        .subscribe( (resp: any) => {

            if ( resp.ok === true ) {
              resolve( true );
            } else {
              reject( false );
            }

        });

    });

  }



}
