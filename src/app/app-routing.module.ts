import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login-cidadao',
    loadChildren: () => import('./pages/login-cidadao/login-cidadao.module').then( m => m.LoginCidadaoPageModule)
  },
  {
    path: 'login-gestor',
    loadChildren: () => import('./pages/login-gestor/login-gestor.module').then( m => m.LoginGestorPageModule)
  },
  {
    path: 'cidadao',
    loadChildren: () => import('./pages/cidadao/cidadao.module').then( m => m.CidadaoPageModule)
  },
  {
    path: 'nova-solicitacao',
    loadChildren: () => import('./pages/nova-solicitacao/nova-solicitacao.module').then( m => m.NovaSolicitacaoPageModule)
  },
  {
    path: 'gestor',
    loadChildren: () => import('./pages/gestor/gestor.module').then( m => m.GestorPageModule)
  },
  {
    path: 'inicio-gestor',
    loadChildren: () => import('./pages/inicio-gestor/inicio-gestor.module').then( m => m.InicioGestorPageModule)
  },
  {
    path: 'estatistica',
    loadChildren: () => import('./pages/estatistica/estatistica.module').then( m => m.EstatisticaPageModule)
  },
  {
    path: 'signup-cidadao',
    loadChildren: () => import('./pages/signup-cidadao/signup-cidadao.module').then( m => m.SignupCidadaoPageModule)
  },
  {
    path: 'minha-solicitacao-detalhe',
    loadChildren: () => import('./pages/minha-solicitacao-detalhe/minha-solicitacao-detalhe.module').then( m => m.MinhaSolicitacaoDetalhePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'inicio-gestor-detalhe',
    loadChildren: () => import('./pages/inicio-gestor-detalhe/inicio-gestor-detalhe.module').then( m => m.InicioGestorDetalhePageModule)
  },
  {
    path: 'tipo-solicitacao-gestor',
    loadChildren: () => import('./pages/tipo-solicitacao-gestor/tipo-solicitacao-gestor.module').then( m => m.TipoSolicitacaoGestorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
