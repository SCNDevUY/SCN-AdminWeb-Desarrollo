import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;

  public data: any;

  public oculto: string = 'oculto';

  public cargando: boolean = false;

  public notificacion = new EventEmitter<any>();

  constructor() {
   }



   ocultarModal() {

    this.oculto = 'oculto';
    this.tipo = null;
    this.data = null;

   }



   mostrarModal( tipo: string, data: any ) {

    this.oculto = '';
    this.tipo = tipo;
    this.data = data;

  }


}
