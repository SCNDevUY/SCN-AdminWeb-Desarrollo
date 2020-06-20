import { Component, OnInit } from '@angular/core';

// Modelos
import { SubCategoria } from 'src/app/models/subcategoria.model';
import { Usuario } from '../../models/usuario.model';

// Servicios
import { SubcategoriaService } from 'src/app/services/subcategoria.service';

import Swal from 'sweetalert2';
import { NifelcoService } from '../../services/nifelco.service';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styles: []
})
export class SubcategoriasComponent implements OnInit {

  usuario: Usuario;
  subcategorias: SubCategoria[] = [];
  desde: number = 0;
  limite: number = 5;
  totalRegistros: number = 0;
  cargando: boolean = true;

  activos: boolean = true;

  // NIFELCO
  categoriasNifelco: any[];

  constructor( public _subCategoriaService: SubcategoriaService,
               public _nifelcoService: NifelcoService ) { }

  ngOnInit(): void {
    this.cargarSubCategorias();
    this.cargarCategoriasNifelco('');
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
  }

  // Buscar
  buscarSubCategorias( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarSubCategorias();
      return;
    }

    this.cargando = true;

    this._subCategoriaService.buscarSubCategorias( termino )
      .subscribe( (subcategorias: SubCategoria[]) => {

        this.subcategorias = subcategorias;
        this.cargando = false;

      });

  }

  // Cargar
  cargarSubCategorias( activo: boolean = true ) {

    this.cargando = true;

    if ( activo === true ) {
      this.activos = true;
    } else {
      this.activos = false;
    }

    this._subCategoriaService.cargarSubCategorias( this.desde, this.limite, activo )
      .subscribe( (resp: any) => {

        this.subcategorias = resp.subCategorias;
        this.totalRegistros = resp.total;
        this.cargando = false;

      });

  }

  // Guardar
  guardarSubCategoria( subcategoria: SubCategoria) {

    this._subCategoriaService.actualizarSubCategoria( subcategoria )
      .subscribe( (resp: any) => {

        Swal.fire({
          title: 'SubCategoria Modificada',
          text: subcategoria.nombre,
          icon: 'success',
          confirmButtonText: 'Bien!'
        });

        this.cargarSubCategorias();

      });

  }

  // Agregar
  async agregarSubCategoria() {

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede agregar una SubCategoria porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    let { value: subcategoria } = await Swal.fire({
      title: 'Ingrese la SubCategoria a agregar',
      input: 'text',
      inputPlaceholder: 'Ingrese la subcategoria...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar una subcategoria';
        }
      }
    });

    if (subcategoria) {

      subcategoria = subcategoria.toUpperCase();

      const subcategoriaNueva = new SubCategoria(
        subcategoria,
        true
      );

      this._subCategoriaService.crearSubCategoria( subcategoriaNueva )
        .subscribe( (resp: any) => {

          Swal.fire({
            title: 'Correcto!',
            text: 'Se creo la SubCategoria correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.cargarSubCategorias();

      });
    }

  }


  borrarSubCategoria( subcategoria: SubCategoria ) {

    // this.usuario = JSON.parse( localStorage.getItem('usuario') );

    if ( this.usuario.role !== 'ADMIN_ROLE' ) {

      Swal.fire({
        title: 'Atencion!',
        text: 'No puede borrar la SubCategoria porque no es Administrador',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;

    }

    Swal.fire({
      title: 'Eliminar SubCategoria',
      text: 'Esta seguro que desea eliminar la SubCategoria: ' + subcategoria.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._subCategoriaService.borrarSubCategoria( subcategoria )
          .subscribe( (resp: any) => {

            Swal.fire(
              'Eliminado!',
              'Se elimino la SubCategoria',
              'success'
            );

            this.cargarSubCategorias( false );

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
    this.cargarSubCategorias();

  }


  // NIFELCO

  cargarCategoriasNifelco( grupoPadre: string ) {

    this._nifelcoService.cargarGrupoArticulos( grupoPadre )
        .subscribe( (resp: any) => {

          this.categoriasNifelco = resp.result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['NS2:TGrupo_Articulos'];
    });

  }



}
