import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Componentes
import { PagesComponent } from './pages.component';

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

import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ModalSubcategoriasComponent } from '../components/modal-subcategorias/modal-subcategorias.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';

// Rutas
import { PAGES_ROUTES } from './pages.routes';
import { ArticulosInicioComponent } from './articulos/articulos-inicio.component';
import { GlobalesComponent } from './globales/globales.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        ModalSubcategoriasComponent,
        MarcasComponent,
        SubcategoriasComponent,
        CategoriasComponent,
        ArticulosComponent,
        ArticulosActivosComponent,
        ArticulosNuevosComponent,
        ArticulosEditarComponent,
        ArticulosMailingComponent,
        ArticulosOfertasComponent,
        ArticulosSlideshowComponent,
        ArticulosSuperOfertaComponent,
        ArticulosInicioComponent,
        GlobalesComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ChartsModule,
        PAGES_ROUTES,
        PipesModule
    ]
})
export class PagesModule { }
