import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticulosActivosComponent } from './articulos/articulos-activos.component';
import { ArticulosNuevosComponent } from './articulos/articulos-nuevos.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuracion de la cuenta' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil del usuario' } },

            // Mantenimeintos
            { path: 'usuarios',         component: UsuariosComponent,         data: { titulo: 'Mantenimiento de usuarios' } },
            { path: 'marcas',           component: MarcasComponent,           data: { titulo: 'Mantenimiento de marcas' } },
            { path: 'categorias',       component: CategoriasComponent,       data: { titulo: 'Mantenimiento de Categorias' } },
            { path: 'subcategorias',    component: SubcategoriasComponent,    data: { titulo: 'Mantenimiento de SubCategorias' } },
            { path: 'articulos',        component: ArticulosComponent,        data: { titulo: 'Mantenimiento de Articulos' } },
            { path: 'articulosActivos', component: ArticulosActivosComponent, data: { titulo: 'Mantenimiento de Articulos' } },
            { path: 'articulosNuevos',  component: ArticulosNuevosComponent,  data: { titulo: 'Mantenimiento de Articulos' } },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
