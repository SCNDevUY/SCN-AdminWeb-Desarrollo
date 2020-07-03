import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _usuariosService: UsuarioService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
        .subscribe( resp => {

          this.cargarUsuarios();

        });
  }



  mostrarModal( usuario: Usuario ) {

    this._modalUploadService.mostrarModal( 'usuarios', usuario );

  }



  cargarUsuarios() {

    this.cargando = true;

    this._usuariosService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {

        console.log(resp);

        this.usuarios = resp.usuarios;
        this.totalRegistros = resp.total;
        this.cargando = false;

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
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuariosService.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) => {

        this.usuarios = usuarios;
        this.cargando = false;

      });

  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuariosService.usuario._id ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede borrar el usuario que esta logueado',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    if ( this._usuariosService.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede borrar el usuario porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    Swal.fire({
      title: 'Eliminar Usuario',
      text: 'Esta seguro que desea eliminar el usuario: ' + usuario.email,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._usuariosService.borrarUsuario( usuario._id )
          .subscribe( (resp: any) => {

            Swal.fire(
              'Eliminado!',
              'Se elimino el usuario',
              'success'
            );
            this.cargarUsuarios();

          });

      }
    });


  }

  guardarUsuario( usuario: Usuario ) {

      this._usuariosService.actualizarUsuario( usuario )
        .subscribe();

  }


}
