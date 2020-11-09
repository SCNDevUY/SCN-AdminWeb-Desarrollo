import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// MODELOS
import { Articulo } from '../../models/articulo.model';

// SERVICIOS
import { ArticuloService } from '../../services/articulo.service';
import { CarouselService } from '../../services/carousel.service';
import { SubirArchivoService } from '../../services/subir-archivo.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styles: []
})
export class ArticulosComponent implements OnInit {

  totalCantidad: number = 0;
  activosCantidad: number = 0;
  inactivosCantidad: number = 0;
  nuevosCantidad: number = 0;
  mailingCantidad: number = 0;
  slideshowCantidad: number = 0;
  slideshowImagenesCantidad: number = 0;
  ofertasCantidad: number = 0;
  superOfertaCantidad: number = 0;
  inicioCantidad: number = 0;

  articulos: Articulo[];

  data: any[];


  constructor( public _articulosService: ArticuloService,
               public _subirArchivoService: SubirArchivoService,
               public _carouselService: CarouselService,
               public router: Router ) { }

  ngOnInit(): void {
    this.obtenerCantidades();
  }


  obtenerCantidades() {

    this._articulosService.cantidades()
      .subscribe( (resp: Articulo[]) => {

        this.totalCantidad = resp.length;

        this.activosCantidad = resp.filter( articulo => articulo.activo === true && articulo.nuevo === false).length;

        this.inactivosCantidad = resp.filter( articulo => articulo.activo === false && articulo.nuevo === false ).length;

        this.nuevosCantidad = resp.filter( articulo => articulo.nuevo === true ).length;

        this.mailingCantidad = resp.filter( articulo => articulo.mailing === true &&
                                                        articulo.nuevo === false &&
                                                        articulo.activo === true
                                          ).length;

        this.slideshowCantidad = resp.filter( articulo => articulo.slideShow === true &&
                                                          articulo.nuevo === false &&
                                                          articulo.activo === true
                                            ).length;

        this.ofertasCantidad = resp.filter( articulo => articulo.oferta === true &&
                                                        articulo.nuevo === false &&
                                                        articulo.activo === true
                                          ).length;

        this.superOfertaCantidad = resp.filter( articulo => articulo.superOferta === true &&
                                                        articulo.nuevo === false &&
                                                        articulo.activo === true
                                          ).length;
        this.inicioCantidad = resp.filter( articulo => articulo.inicio === true &&
                                                        articulo.nuevo === false &&
                                                        articulo.activo === true
                                          ).length;

      });


    this._carouselService.cargarCarousel()
        .subscribe( (carouselResp: any) => {
            this.slideshowImagenesCantidad = carouselResp.total;
    });

  }

  verActivosoInactivos( titulo: string, valor: boolean ) {
    this.router.navigate([ '/articulosActivos', { titulo, activo: valor} ]);
  }

  verNuevos() {
    this.router.navigate([ '/articulosNuevos' ]);
  }

  verMailing() {
    this.router.navigate([ '/articulosMailing' ]);
  }

  verOfertas() {
    this.router.navigate([ '/articulosOfertas' ]);
  }

  verSuperOferta() {
    this.router.navigate([ '/articulosSuperOferta' ]);
  }

  verSlideshow() {
    this.router.navigate([ '/articulosSlideshow' ]);
  }

  verSlideshowImagenes() {
    this.router.navigate([ '/articulosSlideshowImagenes' ]);
  }

  verInicio() {
    this.router.navigate([ '/articulosInicio' ]);
  }




  // cambiarImagenes() {

  //   this._articulosService.cargarArticulos(0, 0, true )
  //     .subscribe( (arti: any) => {

  //       console.log(arti);

  //       this.data = arti.articulos;

  //       this.data.forEach( (articulo: any, index) => {

  //           const imgAgregar = {
  //             url: articulo.img,
  //             nombre: articulo.imgNombre,
  //             principal: true
  //           };
  //           imgTmp = articulo.imagenes;
  //           imgTmp = imgTmp.slice(1, 1);
  //           ( imgAgregar );
  //           articulo.imagenes = imgTmp;
            
  //           let imgTmp = [];
  //           let imgTmpCortado = [];
  //           imgTmp = articulo.imagenes;
  //           imgTmpCortado = imgTmp.slice(0, 1);
            
  //           articulo.imagenes = imgTmpCortado;


  //           this._subirArchivoService.actualizarData(articulo, 'articulos')
  //             .subscribe( resp => {

  //               console.log(resp);

  //             });

  //       });


  //     });

  // }


}
