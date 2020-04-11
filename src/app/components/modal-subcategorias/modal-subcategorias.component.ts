import { Component, OnInit, Input } from '@angular/core';

// Servicios
import { ModalSubcategoriasService } from './modal-subcategorias.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';

// Modelos
import { SubCategoria } from '../../models/subcategoria.model';



@Component({
  selector: 'app-modal-subcategorias',
  templateUrl: './modal-subcategorias.component.html',
  styles: []
})
export class ModalSubcategoriasComponent implements OnInit {

  id: string;

  subcategorias = [];


  constructor( public _modalSubcategoriasService: ModalSubcategoriasService ) {
  }

  ngOnInit(): void {
  }


  agregar( subcategoria: SubCategoria ) {

    this._modalSubcategoriasService.subcategorias.push(subcategoria);

    const index = this._modalSubcategoriasService.subcategoriasdeSubcategorias.map( item => item.nombre).indexOf(subcategoria.nombre);

    this._modalSubcategoriasService.subcategoriasdeSubcategorias.splice(index, 1);

    this.guardar( this._modalSubcategoriasService.categoria._id, subcategoria._id );

  }


  quitar( subcategoria: SubCategoria ) {

    this._modalSubcategoriasService.subcategoriasdeSubcategorias.push(subcategoria);

    const index = this._modalSubcategoriasService.subcategorias.map( item => item.nombre).indexOf(subcategoria.nombre);

    this._modalSubcategoriasService.subcategorias.splice(index, 1);

    this.guardar( this._modalSubcategoriasService.categoria._id, subcategoria._id );

  }


  guardar( categoriaId: string, subcategoriaId: string ) {

    const subCategoriasAgregar = {
      subcategoria: subcategoriaId
    };

    this._modalSubcategoriasService.actualizarSubCategoriasXcategoria( categoriaId, subCategoriasAgregar )
      .subscribe();

  }


  cerrarModal() {

    this.id = null;
    this.subcategorias = [];

    this._modalSubcategoriasService.ocultarModal();

  }



}
