import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {


  totalCantidad: number = 0;
  activosCantidad: number = 0;
  inactivosCantidad: number = 0;
  nuevosCantidad: number = 0;
  mailingCantidad: number = 0;
  slideshowCantidad: number = 0;
  ofertasCantidad: number = 0;
  superOfertaCantidad: number = 0;
  inicioCantidad: number = 0;

  graficos: any;


  constructor( public _articulosService: ArticuloService ) { }

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

        this.graficos = {
            grafico1: {
                labels: ['Activos', 'Inactivos', 'Nuevos', 'Mailing', 'SlideShow', 'Oferta', 'SuperOferta', 'Inicio' ],
                data:  [this.activosCantidad,
                        this.inactivosCantidad,
                        this.nuevosCantidad,
                        this.mailingCantidad,
                        this.slideshowCantidad,
                        this.ofertasCantidad,
                        this.superOfertaCantidad,
                        this.inicioCantidad],
                type: 'doughnut',
                leyenda: `Cantidad de Articulos - ( ${ this.totalCantidad } )`
            }
        };

      });
  }

}
