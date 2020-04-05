import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private storage: AngularFireStorage ) { }



  

  private subirImagen( event ) {

    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const task = this.storage.upload(filePath, file);

  }
}
