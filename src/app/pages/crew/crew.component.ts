import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// SERVICIOS
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { CrewService } from '../../services/crew.service';
import { UsuarioService } from '../../services/usuario.service';

// MODELOS
import { Crew } from '../../models/crew.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styles: []
})
export class CrewComponent implements OnInit {

  crew: Crew;
  usuario: Usuario;

  cargando: boolean = true;
  activos: boolean = true;

  totalRegistros: number = 0;

  constructor( public _crewServices: CrewService,
               public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService  ) { }

  ngOnInit(): void {

    this.cargarCrew();
    this.usuario = JSON.parse( localStorage.getItem('usuario') );

  }


  mostrarModal( crew: Crew ) {
    this._modalUploadService.mostrarModal( 'crew', crew );
  }

  // CARGAR CREW
  cargarCrew( activo: boolean = true ) {

    this.cargando = true;

    if ( activo === true ) {
      this.activos = true;
    } else {
      this.activos = false;
    }

    this._crewServices.cargarCrew( activo )
      .subscribe( (resp: any) => {

        this.crew = resp.crew;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }

  // ACTUALIZAR CREW
  guardarCrew( crew: Crew ) {

    this._crewServices.actualizarCrew( crew )
      .subscribe( (resp: any) => {

        Swal.fire({
          title: 'Crew Modificado',
          text: crew.nombre,
          icon: 'success',
          confirmButtonText: 'Bien!'
        });

        this.cargarCrew();

      });

  }



  // AGREGAR CREW
  async agregarCrew() {

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede agregar un Crew porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    let { value: crew = '' } = await Swal.fire({
      title: 'Ingrese el nombre del Crew a agregar',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre';
        }
      }
    });

    if (crew) {

      crew = crew.toUpperCase();

      const crewNuevo = new Crew(
        crew,
        true
      );

      this._crewServices.crearCrew( crewNuevo )
        .subscribe( (resp: any) => {

          Swal.fire({
            title: 'Correcto!',
            text: 'Se creo la el Crew correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.cargarCrew();

      });
    }

  }

  // BORRAR CREW
  borrarCrew( crew: Crew ) {

    // this.usuario = JSON.parse( localStorage.getItem('usuario') );

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede borrar el crew porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    Swal.fire({
      title: 'Eliminar crew',
      text: 'Esta seguro que desea eliminar el Crew: ' + crew.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._crewServices.borrarCrew( crew )
          .subscribe( (resp: any) => {

            Swal.fire(
              'Eliminado!',
              'Se elimino el crew',
              'success'
            );

            this.cargarCrew( false );

          });

      }
    });

  }





}
