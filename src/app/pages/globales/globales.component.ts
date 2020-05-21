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
  _id: string;

  constructor( public _globalServices: GlobalesService ) {

    this._globalServices.cargarConfiguracion()
      .subscribe( (resp: any) => {

          this.global = resp.global;
          this._id = resp.global[0]._id;

      });


  }

  ngOnInit(): void {
  }


  guardarCarrito( carrito: boolean ) {

    const global = {
      carrito
    };

    console.log(carrito);
    this._globalServices.guardarConfiguracion( global, this._id )
      .subscribe();

  }

}
