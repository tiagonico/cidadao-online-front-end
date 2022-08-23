import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CidadaoPage } from './cidadao.page';

const routes: Routes = [
  {
    path: 'menu',
    component: CidadaoPage,
    children:[
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'minhas-solicitacoes',
        loadChildren: () => import('../minhas-solicitacoes/minhas-solicitacoes.module').then( m => m.MinhasSolicitacoesPageModule)
      },
      {
        path: '',
        redirectTo: '/cidadao/menu/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/cidadao/menu/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CidadaoPageRoutingModule {}
