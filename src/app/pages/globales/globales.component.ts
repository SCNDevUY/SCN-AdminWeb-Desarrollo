import { Component, OnInit } from '@angular/core';
import { GlobalesService } from '../../services/globales.service';
import { Global } from '../../models/global.model';

@Component({
  selector: 'app-globales',
  templateUrl: './globales.component.html',
  styles: []
})
export class GlobalesComponent implements OnInit {


  global: Global[] = [];

  constructor( public _globalServices: GlobalesService ) {

    this._globalServices.cargarConfiguracion()
      .subscribe( (resp: any) => {

          this.global = resp.global;

          console.log(this.global);

      });


  }

  ngOnInit(): void {
  }


  guardarCarrito( carrito ) {

    console.log(carrito);

  }

}
