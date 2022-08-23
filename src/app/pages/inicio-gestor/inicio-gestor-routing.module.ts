import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioGestorPage } from './inicio-gestor.page';

const routes: Routes = [
  {
    path: '',
    component: InicioGestorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioGestorPageRoutingModule {}
