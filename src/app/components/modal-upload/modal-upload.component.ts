import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalUploadService } from './modal-upload.service';

import { SubirArchivoService } from '../../services/subir-archivo.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  data: any;


  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadService: ModalUploadService ) {

   }

  ngOnInit(): void {
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
        Swal.fire({
          title: 'Solo imagenes',
          text: 'El archivo seleccionado no es una imagen',
          icon: 'error',
          confirmButtonText: 'Atencion!'
        });
        this.imagenSubir = null;
        return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }



  subirImagen( tipo: string, data: any ) {

    this._modalUploadService.cargando = true;

    if ( tipo === 'usuarios' ) {

       this._subirArchivoService.subirArchivoUsuario( this.imagenSubir, data );

    }

    this.imagenSubir = null;
    this.imagenTemp = null;
    this.data = null;

  }



  cerrarModal() {

    this.imagenSubir = null;
    this.imagenTemp = null;
    this.data = null;

    this._modalUploadService.ocultarModal();
  }


}
