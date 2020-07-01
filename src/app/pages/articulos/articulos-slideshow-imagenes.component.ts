import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

// MODELOS
import { Carousel } from '../../models/carousel.model';
import { Usuario } from '../../models/usuario.model';

// SERVICIOS
import { CarouselService } from '../../services/carousel.service';
import { UsuarioService } from '../../services/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-articulos-slideshow-imagenes',
  templateUrl: './articulos-slideshow-imagenes.component.html',
  styles: []
})
export class ArticulosSlideshowImagenesComponent implements OnInit {

  carousel: Carousel;
  usuario: Usuario;

  cargando: boolean = true;
  activos: boolean = true;

  totalRegistros: number = 0;

  constructor( public _carouselService: CarouselService,
               public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarCarousel();
    this.usuario = JSON.parse( localStorage.getItem('usuario') );

  }


  mostrarModal( carousel: Carousel ) {
    this._modalUploadService.mostrarModal( 'carousel', carousel );
  }

// CARGAR CAROUSEL
  cargarCarousel( activo: boolean = true ) {

    this.cargando = true;

    if ( activo === true ) {
      this.activos = true;
    } else {
      this.activos = false;
    }

    this._carouselService.cargarCarousel( activo )
      .subscribe( (resp: any) => {

        this.carousel = resp.carousel;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }

// GUARDAR CAROUSEL
  guardarCarousel( carousel: Carousel ) {

    this._carouselService.actualizarCarousel( carousel )
      .subscribe( (resp: any) => {

        Swal.fire({
          title: 'Carousel Modificado',
          text: carousel.nombre,
          icon: 'success',
          confirmButtonText: 'Bien!'
        });

        this.cargarCarousel();

      });

  }



// AGREGAR CAROUSEL
  async agregarCarousel() {

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede agregar un carousel porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    let { value: carousel } = await Swal.fire({
      title: 'Ingrese el nombre del Carousel a agregar',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre';
        }
      }
    });

    if (carousel) {

      carousel = carousel.toUpperCase();

      const carouselNuevo = new Carousel(
        carousel,
        true
      );

      this._carouselService.crearCarousel( carouselNuevo )
        .subscribe( (resp: any) => {

          Swal.fire({
            title: 'Correcto!',
            text: 'Se creo la el carousel correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.cargarCarousel();

      });
    }

  }

// BORRAR CAROUSEL
  borrarCarousel( carousel: Carousel ) {

    // this.usuario = JSON.parse( localStorage.getItem('usuario') );

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede borrar el carousel porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    Swal.fire({
      title: 'Eliminar Carousel',
      text: 'Esta seguro que desea eliminar el carousel: ' + carousel.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._carouselService.borrarCarousel( carousel )
          .subscribe( (resp: any) => {

            Swal.fire(
              'Eliminado!',
              'Se elimino el carousel',
              'success'
            );

            this.cargarCarousel( false );

          });

      }
    });

  }





}
