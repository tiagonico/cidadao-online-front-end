import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginCidadaoPage } from './login-cidadao.page';

const routes: Routes = [
  {
    path: '',
    component: LoginCidadaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginCidadaoPageRoutingModule {}
