import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoSolicitacaoGestorPage } from './tipo-solicitacao-gestor.page';

const routes: Routes = [
  {
    path: '',
    component: TipoSolicitacaoGestorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoSolicitacaoGestorPageRoutingModule {}
