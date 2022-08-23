import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioGestorDetalhePage } from './inicio-gestor-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: InicioGestorDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioGestorDetalhePageRoutingModule {}
