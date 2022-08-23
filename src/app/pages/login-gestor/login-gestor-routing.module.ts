import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGestorPage } from './login-gestor.page';

const routes: Routes = [
  {
    path: '',
    component: LoginGestorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginGestorPageRoutingModule {}
