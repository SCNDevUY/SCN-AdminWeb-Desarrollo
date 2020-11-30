import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

// Modelos
import { Marca } from 'src/app/models/marca.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { MarcaService } from 'src/app/services/marca.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { NifelcoService } from '../../services/nifelco.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styles: []
})
export class MarcasComponent implements OnInit {

  usuario: Usuario;
  marcas: Marca[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  activos: boolean = true;

  // NIFELCO
  marcasNifelco: any[];

  constructor( public _marcasService: MarcaService,
               public _nifelcoService: NifelcoService,
               public _modalUploadService: ModalUploadService ) { }


  ngOnInit(): void {
    this.cargarMarcas();
    this.cargarMarcasNifelco( -1 );
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
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


  cargarMarcas( activo: boolean = true ) {

    this.cargando = true;

    if ( activo === true ) {
      this.activos = true;
    } else {
      this.activos = false;
    }

    this._marcasService.cargarMarcas( this.desde, 5, activo )
      .subscribe( (resp: any) => {

        this.marcas = resp.marcas;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }

  guardarMarca( marca: Marca) {

    this._marcasService.actualizarMarca( marca )
      .subscribe( (resp: any) => {

        Swal.fire({
          title: 'Marca Modificada',
          text: marca.nombre,
          icon: 'success',
          confirmButtonText: 'Bien!'
        });

        this.cargarMarcas();

      });

  }

  async agregarMarca() {

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede agregar una marca porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    let { value: marca = '' } = await Swal.fire({
      title: 'Ingrese la marca a agregar',
      input: 'text',
      inputPlaceholder: 'Ingrese la marca...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar una marca';
        }
      }
    });

    if (marca) {

      marca = marca.toUpperCase();

      const marcaNueva = new Marca(
        marca,
        true
      );

      this._marcasService.crearMarca( marcaNueva )
        .subscribe( (resp: any) => {

          Swal.fire({
            title: 'Correcto!',
            text: 'Se creo la marca correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.cargarMarcas();

      });
    }

  }


  borrarMarca( marca: Marca ) {

    // this.usuario = JSON.parse( localStorage.getItem('usuario') );

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede borrar la marca porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    Swal.fire({
      title: 'Eliminar Marca',
      text: 'Esta seguro que desea eliminar la marca: ' + marca.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._marcasService.borrarMarca( marca )
          .subscribe( (resp: any) => {

            Swal.fire(
              'Eliminado!',
              'Se elimino la marca',
              'success'
            );

            this.cargarMarcas( false );

          });

      }
    });

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


    // NIFELCO

    cargarMarcasNifelco( codMarca: number ) {

      this._nifelcoService.cargarMarcas( codMarca )
        .subscribe( (resp: any) => {

          this.marcasNifelco = resp.result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:TMarca'];

        });

    }





}
