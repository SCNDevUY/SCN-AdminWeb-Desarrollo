import { Component, OnInit } from '@angular/core';
import { NgForm, Form } from '@angular/forms';

// Servicios
import { NifelcoService } from '../../services/nifelco.service';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styles: []
})
export class ListaArticulosComponent implements OnInit {

  grupoArticulos: any[];
  marcas: any[];

  listaArticulos: any[];
  totalRegistros = 0;

  palabras: string;
  codigoGrupo: string;
  codigoMarca: number;

  constructor( public _nifelcoService: NifelcoService ) {
    this.cargarGrupoArticulos( '' );
    this.cargarMarcas( -1 );
  }

  ngOnInit(): void {
  }

  cargarListaArticulos( palabras: string, codigoGrupo: string, codigoMarca: number  ) {

    this._nifelcoService.cargarListaArticulos( palabras, codigoGrupo, codigoMarca )
      .subscribe( (resp: any) => {
        // this.cargando = true;
        // console.log(resp);
        this.listaArticulos = resp.result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:TArticulo_Lista'];
        this.totalRegistros = this.listaArticulos.length;
        // console.log( this.listaArticulos );
      });

  }

  consultar( forma: Form ) {

    console.log( this.palabras);
    console.log(this.codigoGrupo);
    console.log(this.codigoMarca);

    this.cargarListaArticulos( this.palabras, this.codigoGrupo, this.codigoMarca );

  }



  cargarGrupoArticulos( grupoPadre: string ) {

    this._nifelcoService.cargarGrupoArticulos( grupoPadre )
      .subscribe( (resp: any) => {
        // this.cargando = true;
        // console.log( resp );
        this.grupoArticulos = resp.result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:TGrupo_Articulos'];
        this.totalRegistros = this.grupoArticulos.length;
      });

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
