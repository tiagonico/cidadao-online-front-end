import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioGestorDetalhePageRoutingModule } from './inicio-gestor-detalhe-routing.module';

import { InicioGestorDetalhePage } from './inicio-gestor-detalhe.page';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { AppComponent } from 'src/app/app.component';
import { ImageUtilService } from 'src/services/image-util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioGestorDetalhePageRoutingModule
  ],
  declarations: [InicioGestorDetalhePage],
  providers: [SolicitacaoService,ImageUtilService]
})
export class InicioGestorDetalhePageModule {}
