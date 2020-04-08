import { Component, OnInit } from '@angular/core';

// Modelos
import { Marca } from 'src/app/models/marca.model';

// Servicios
import { MarcaService } from 'src/app/services/marca.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  marcas: Marca[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _marcasService: MarcaService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  mostrarModal( marca: Marca ) {
    this._modalUploadService.mostrarModal( 'marcas', marca );
  }


  buscarMarca( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMarcas();
      return;
    }

    this.cargando = true;

    this._marcasService.buscarMarcas( termino )
      .subscribe( (marcas: Marca[]) => {

        this.marcas = marcas;
        this.cargando = false;

      });

  }


  cargarMarcas() {

    this.cargando = true;

    this._marcasService.cargarMarcas( this.desde )
      .subscribe( (resp: any) => {

        this.marcas = resp.marcas;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }

  guardarMarca( marca: Marca) {

    this._marcasService.actualizarMarca( marca )
      .subscribe();

  }

  agregarMarca() {
    
  }


  borrarMarca( marca: Marca) {

  }


  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarMarcas();

  }
}
