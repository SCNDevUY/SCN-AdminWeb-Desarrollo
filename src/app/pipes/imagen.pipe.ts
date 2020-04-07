import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string ): any {

    if ( !img ) {
      return '/assets/images/no-img.jpg';
    }

    // Chequeo si viene de google
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    return img;
  }

}
