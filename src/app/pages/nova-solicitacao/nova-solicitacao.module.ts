import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaSolicitacaoPageRoutingModule } from './nova-solicitacao-routing.module';

import { NovaSolicitacaoPage } from './nova-solicitacao.page';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ImageUtilService } from 'src/services/image-util.service';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaSolicitacaoPageRoutingModule
    
  ],
  declarations: [NovaSolicitacaoPage],
  providers: [SolicitacaoService,Geolocation,Camera,ImageUtilService]
})
export class NovaSolicitacaoPageModule {}
