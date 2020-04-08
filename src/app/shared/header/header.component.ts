import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {

    this.usuario = this._usuarioService.usuario;

    this._modalUploadService.notificacion
    .subscribe( resp => {

      this.usuario = this._usuarioService.usuario;

    });

  }

}
