import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaSolicitacaoPage } from './nova-solicitacao.page';

const routes: Routes = [
  {
    path: '',
    component: NovaSolicitacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaSolicitacaoPageRoutingModule {}
