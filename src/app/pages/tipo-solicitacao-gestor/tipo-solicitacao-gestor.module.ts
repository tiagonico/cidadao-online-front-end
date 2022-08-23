import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoSolicitacaoGestorPageRoutingModule } from './tipo-solicitacao-gestor-routing.module';

import { TipoSolicitacaoGestorPage } from './tipo-solicitacao-gestor.page';
import { TipoSolicitacaoService } from 'src/services/domain/tipo-solicitacao.service';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ImageUtilService } from 'src/services/image-util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoSolicitacaoGestorPageRoutingModule
  ],
  declarations: [TipoSolicitacaoGestorPage],
  providers: [TipoSolicitacaoService,Camera,ImageUtilService]
})
export class TipoSolicitacaoGestorPageModule {}
