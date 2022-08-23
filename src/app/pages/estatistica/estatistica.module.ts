import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstatisticaPageRoutingModule } from './estatistica-routing.module';
import { NgChartsModule } from 'ng2-charts';

import { EstatisticaPage } from './estatistica.page';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { ImageUtilService } from 'src/services/image-util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstatisticaPageRoutingModule,
    NgChartsModule
  ],
  declarations: [EstatisticaPage],
  providers: [SolicitacaoService,ImageUtilService]
})
export class EstatisticaPageModule {}
