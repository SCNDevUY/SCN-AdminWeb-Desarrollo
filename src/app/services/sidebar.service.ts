import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Configuraciones globales', url: '/globales' }
        // { titulo: 'ProgressBar', url: '/progress' },
        // { titulo: 'Graficas', url: '/graficas1' },
        // { titulo: 'Promesas', url: '/promesas' },
        // { titulo: 'RxJS', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Marcas', url: '/marcas' },
        { titulo: 'Categorias', url: '/categorias' },
        { titulo: 'SubCategorias', url: '/subcategorias' },
        { titulo: 'Articulos', url: '/articulos' }
      ]
    },
    {
      titulo: 'Nifelco',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Marcas', url: '/nifelco/marcas' },
        { titulo: 'Grupo Articulos', url: '/nifelco/grupoarticulos' },
        { titulo: 'Lista Articulos', url: '/nifelco/listaarticulos' }
      ]
    }
  ];

  constructor() { }
}
