import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupCidadaoPage } from './signup-cidadao.page';

const routes: Routes = [
  {
    path: '',
    component: SignupCidadaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupCidadaoPageRoutingModule {}
