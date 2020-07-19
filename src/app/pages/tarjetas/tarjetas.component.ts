import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// MODELOS
import { Tarjeta } from '../../models/tarjeta.model';
import { Usuario } from '../../models/usuario.model';

// SERVICIOS
import { TarjetasService } from '../../services/tarjetas.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: [
  ]
})
export class TarjetasComponent implements OnInit {

  tarjetas: Tarjeta;
  usuario: Usuario;

  cargando: boolean = true;
  activos: boolean = true;

  totalRegistros: number = 0;

  constructor( public _tarjetasService: TarjetasService,
               public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {

    this.cargarTarjetas();
    this.usuario = JSON.parse( localStorage.getItem('usuario') );

  }


  mostrarModal( tarjeta: Tarjeta ) {
    this._modalUploadService.mostrarModal( 'tarjetas', tarjeta );
  }

  // CARGAR Tarjeta
  cargarTarjetas( activo: boolean = true ) {

    this.cargando = true;

    if ( activo === true ) {
      this.activos = true;
    } else {
      this.activos = false;
    }

    this._tarjetasService.cargarTarjetas( activo )
      .subscribe( (resp: any) => {

        this.tarjetas = resp.tarjeta;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }

  // ACTUALIZAR Tarjeta
  guardarTarjeta( tarjeta: Tarjeta ) {

    this._tarjetasService.actualizarTarjeta( tarjeta )
      .subscribe( (resp: any) => {

        Swal.fire({
          title: 'Tarjeta Modificada',
          text: tarjeta.nombre,
          icon: 'success',
          confirmButtonText: 'Bien!'
        });

        this.cargarTarjetas();

      });

  }



  // AGREGAR Tarjeta
  async agregarTarjeta() {

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede agregar un Tarjeta porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    let { value: tarjeta } = await Swal.fire({
      title: 'Ingrese el nombre de la Tarjeta a agregar',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre';
        }
      }
    });

    if (tarjeta) {

      tarjeta = tarjeta.toUpperCase();

      const tarjetaNuevo = new Tarjeta(
        tarjeta,
        true
      );

      this._tarjetasService.crearTarjeta( tarjetaNuevo )
        .subscribe( (resp: any) => {

          Swal.fire({
            title: 'Correcto!',
            text: 'Se creo la el Tarjeta correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.cargarTarjetas();

      });
    }

  }

  // BORRAR Tarjeta
  borrarTarjeta( tarjeta: Tarjeta ) {

    // this.usuario = JSON.parse( localStorage.getItem('usuario') );

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede borrar el Tarjeta porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    Swal.fire({
      title: 'Eliminar Tarjeta',
      text: 'Esta seguro que desea eliminar la Tarjeta: ' + tarjeta.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._tarjetasService.borrarTarjeta( tarjeta )
          .subscribe( (resp: any) => {

            Swal.fire(
              'Eliminada!',
              'Se elimino la Tarjeta',
              'success'
            );

            this.cargarTarjetas( false );

          });

      }
    });

  }





}
