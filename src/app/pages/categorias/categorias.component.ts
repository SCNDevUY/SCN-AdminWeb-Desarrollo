import { Component, OnInit, OnChanges } from '@angular/core';

// Modelos
import { Categoria } from 'src/app/models/categoria.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { CategoriaService } from 'src/app/services/categoria.service';

import Swal from 'sweetalert2';
import { ModalSubcategoriasService } from '../../components/modal-subcategorias/modal-subcategorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  usuario: Usuario;
  categorias: Categoria[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  oculto: boolean = true;

  activos: boolean = true;

  constructor( public _categoriaService: CategoriaService,
               public _modalSubcategoriasService: ModalSubcategoriasService ) { 
               }

  ngOnInit(): void {
    this.cargarCategorias();
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
  }


  // Buscar
  buscarCategorias( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarCategorias();
      return;
    }

    this.cargando = true;

    this._categoriaService.buscarCategorias( termino )
      .subscribe( (categorias: Categoria[]) => {

        this.categorias = categorias;
        this.cargando = false;

      });

  }

  // Cargar
  cargarCategorias( activo: boolean = true ) {

    this.cargando = true;

    if ( activo === true ) {
      this.activos = true;
    } else {
      this.activos = false;
    }

    this._categoriaService.cargarCategorias( this.desde, activo )
      .subscribe( (resp: any) => {

        this.categorias = resp.categorias;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }


  // Guardar
  guardarCategoria( categoria: Categoria) {

    this._categoriaService.actualizarCategoria( categoria )
      .subscribe( (resp: any) => {

        Swal.fire({
          title: 'Categoria Modificada',
          text: categoria.nombre,
          icon: 'success',
          confirmButtonText: 'Bien!'
        });

        this.cargarCategorias();

      });

  }

  // Agregar
  async agregarCategoria() {

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede agregar una Categoria porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    let { value: categoria } = await Swal.fire({
      title: 'Ingrese la Categoria a agregar',
      input: 'text',
      inputPlaceholder: 'Ingrese la categoria...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar una categoria';
        }
      }
    });

    if (categoria) {

      categoria = categoria.toUpperCase();

      const categoriaNueva = new Categoria(
        categoria,
        true
      );

      this._categoriaService.crearCategoria( categoriaNueva )
        .subscribe( (resp: any) => {

          Swal.fire({
            title: 'Correcto!',
            text: 'Se creo la Categoria correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.cargarCategorias();

      });
    }

  }

  // Borrar
  borrarCategoria( categoria: Categoria ) {

    // this.usuario = JSON.parse( localStorage.getItem('usuario') );

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede borrar la Categoria porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    Swal.fire({
      title: 'Eliminar Categoria',
      text: 'Esta seguro que desea eliminar la Categoria: ' + categoria.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._categoriaService.borrarCategoria( categoria )
          .subscribe( (resp: any) => {

            Swal.fire(
              'Eliminado!',
              'Se elimino la Categoria',
              'success'
            );

            this.cargarCategorias( false );

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
    this.cargarCategorias();

  }


  mostrarModal( categoria: Categoria ) {

    this._categoriaService.buscarCategorias( categoria.nombre )
      .subscribe( (categoriasActualizada: Categoria[]) => {

        this._modalSubcategoriasService.mostrarModal( categoriasActualizada[0] );
      });

  }


}
