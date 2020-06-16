import { Component, OnInit } from '@angular/core';

// Servicios
import { NifelcoService } from '../../services/nifelco.service';

@Component({
  selector: 'app-nifelco-marcas',
  templateUrl: './nifelco-marcas.component.html',
  styles: []
})
export class NifelcoMarcasComponent implements OnInit {

  cargando = false;
  marcas: any[];
  totalRegistros = 0;

  constructor( public _nifelcoService: NifelcoService) {

    this.cargarMarcas( -1 );

  }

  ngOnInit(): void {
  }

  cargarMarcas( codMarca: number ) {

    this._nifelcoService.cargarMarcas( codMarca )
      .subscribe( (resp: any) => {
        // this.cargando = true;

        this.marcas = resp.result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:TMarca'];
        this.totalRegistros = this.marcas.length;

      });

  }

}
