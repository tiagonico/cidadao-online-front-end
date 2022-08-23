import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhaSolicitacaoDetalhePageRoutingModule } from './minha-solicitacao-detalhe-routing.module';

import { MinhaSolicitacaoDetalhePage } from './minha-solicitacao-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhaSolicitacaoDetalhePageRoutingModule
  ],
  declarations: [MinhaSolicitacaoDetalhePage]
})
export class MinhaSolicitacaoDetalhePageModule {}
