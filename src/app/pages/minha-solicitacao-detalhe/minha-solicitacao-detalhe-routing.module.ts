import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhaSolicitacaoDetalhePage } from './minha-solicitacao-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: MinhaSolicitacaoDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhaSolicitacaoDetalhePageRoutingModule {}
