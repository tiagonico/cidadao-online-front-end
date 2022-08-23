import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestorPage } from './gestor.page';

const routes: Routes = [
  {
    path: 'menu',
    component: GestorPage,
    children:[
      {
        path: 'inicio',
        loadChildren: () => import('../inicio-gestor/inicio-gestor.module').then( m => m.InicioGestorPageModule)
      },
      {
        path: 'estatistica',
        loadChildren: () => import('../estatistica/estatistica.module').then( m => m.EstatisticaPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'tipo-solicitacao',
        loadChildren: () => import('../tipo-solicitacao-gestor/tipo-solicitacao-gestor.module').then( m => m.TipoSolicitacaoGestorPageModule)
      },
      {
        path: '',
        redirectTo: '/gestor/menu/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/gestor/menu/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestorPageRoutingModule {}
