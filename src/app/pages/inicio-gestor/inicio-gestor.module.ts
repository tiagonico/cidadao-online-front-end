import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioGestorPageRoutingModule } from './inicio-gestor-routing.module';

import { InicioGestorPage } from './inicio-gestor.page';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { TipoSolicitacaoService } from 'src/services/domain/tipo-solicitacao.service';
import { ImageUtilService } from 'src/services/image-util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioGestorPageRoutingModule
  ],
  declarations: [InicioGestorPage],
  providers: [SolicitacaoService,TipoSolicitacaoService,ImageUtilService]
})
export class InicioGestorPageModule {}
