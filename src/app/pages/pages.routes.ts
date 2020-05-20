import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GlobalesComponent } from './globales/globales.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

// import { ProgressComponent } from './progress/progress.component';
// import { Graficas1Component } from './graficas1/graficas1.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticulosActivosComponent } from './articulos/articulos-activos.component';
import { ArticulosNuevosComponent } from './articulos/articulos-nuevos.component';
import { ArticulosEditarComponent } from './articulos/articulos-editar.component';
import { ArticulosMailingComponent } from './articulos/articulos-mailing.component';
import { ArticulosOfertasComponent } from './articulos/articulos-ofertas.component';
import { ArticulosSlideshowComponent } from './articulos/articulos-slideshow.component';
import { ArticulosSuperOfertaComponent } from './articulos/articulos-super-oferta.component';
import { ArticulosInicioComponent } from './articulos/articulos-inicio.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'globales', component: GlobalesComponent, data: { titulo: 'Configuraciones Globales' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuracion de la cuenta' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil del usuario' } },

            // { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            // { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
            // { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            // { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

            // Mantenimeintos
            { path: 'usuarios',         component: UsuariosComponent,         data: { titulo: 'Mantenimiento de usuarios' } },
            { path: 'marcas',           component: MarcasComponent,           data: { titulo: 'Mantenimiento de marcas' } },
            { path: 'categorias',       component: CategoriasComponent,       data: { titulo: 'Mantenimiento de Categorias' } },
            { path: 'subcategorias',    component: SubcategoriasComponent,    data: { titulo: 'Mantenimiento de SubCategorias' } },
            { path: 'articulos',        component: ArticulosComponent,        data: { titulo: 'Mantenimiento de Articulos' } },
            { path: 'articulosActivos', component: ArticulosActivosComponent, data: { titulo: 'Mantenimiento de Articulos' } },
            { path: 'articulosNuevos',  component: ArticulosNuevosComponent,  data: { titulo: 'Mantenimiento de Articulos - Nuevos' } },
            { path: 'articulosEditar/:id',  component: ArticulosEditarComponent,  data: { titulo: 'Mantenimiento de Articulos - Editar' } },
            { path: 'articulosMailing', component: ArticulosMailingComponent, data: { titulo: 'Mantenimiento de Articulos - Mailing' } },
            { path: 'articulosOfertas', component: ArticulosOfertasComponent, data: { titulo: 'Mantenimiento de Articulos - Ofertas' } },
            { path: 'articulosInicio',  component: ArticulosInicioComponent, data: { titulo: 'Mantenimiento de Articulos - Inicio' } },
            { path: 'articulosSuperOferta',
              component: ArticulosSuperOfertaComponent,
              data: { titulo: 'Mantenimiento de Articulos - Super Oferta' }
            },
            { path: 'articulosSlideshow', component: ArticulosSlideshowComponent, data: {titulo: 'Mantenimiento de Articulos - SlideShow'}},
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
