import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/articulo.model';

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
  ofertasCantidad: number = 0;




  constructor( public _articulosService: ArticuloService,
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
        this.mailingCantidad = resp.filter( articulo => articulo.mailing === true && articulo.nuevo === false).length;
        this.slideshowCantidad = resp.filter( articulo => articulo.slideShow === true && articulo.nuevo === false).length;
        this.ofertasCantidad = resp.filter( articulo => articulo.oferta === true && articulo.nuevo === false).length;

      });

  }

  verActivosoInactivos( titulo: string, valor: boolean ) {
    this.router.navigate([ '/articulosActivos', { titulo, activo: valor} ]);
  }

  verNuevos() {
    this.router.navigate([ '/articulosNuevos' ]);
  }


}
