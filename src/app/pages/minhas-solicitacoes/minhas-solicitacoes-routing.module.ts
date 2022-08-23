import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasSolicitacoesPage } from './minhas-solicitacoes.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasSolicitacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasSolicitacoesPageRoutingModule {}
