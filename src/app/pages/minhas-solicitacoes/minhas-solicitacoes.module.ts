import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasSolicitacoesPageRoutingModule } from './minhas-solicitacoes-routing.module';

import { MinhasSolicitacoesPage } from './minhas-solicitacoes.page';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { ImageUtilService } from 'src/services/image-util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasSolicitacoesPageRoutingModule
  ],
  declarations: [MinhasSolicitacoesPage],
  providers: [SolicitacaoService,ImageUtilService]

})
export class MinhasSolicitacoesPageModule {}
