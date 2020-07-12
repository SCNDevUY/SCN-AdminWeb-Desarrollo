import { Component, OnInit } from '@angular/core';

// Servicios
import { NifelcoService } from '../../services/nifelco.service';

@Component({
  selector: 'app-grupo-articulos',
  templateUrl: './grupo-articulos.component.html',
  styles: []
})
export class GrupoArticulosComponent implements OnInit {

  grupoArticulos: any[];
  totalRegistros = 0;

  constructor( public _nifelcoService: NifelcoService ) {
    this.cargarGrupoArticulos( '' );
   }

  ngOnInit(): void {
  }

  cargarGrupoArticulos( grupoPadre: string ) {

    this._nifelcoService.cargarGrupoArticulos( grupoPadre )
      .subscribe( (resp: any) => {
        // this.cargando = true;
        this.grupoArticulos = resp.result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:TGrupo_Articulos'];
        this.totalRegistros = this.grupoArticulos.length;
      });

  }

}
