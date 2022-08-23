import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ImageUtilService } from 'src/services/image-util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage],
  providers: [SolicitacaoService,Geolocation,ImageUtilService]
})
export class DashboardPageModule {}
