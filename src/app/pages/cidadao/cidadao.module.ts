import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CidadaoPageRoutingModule } from './cidadao-routing.module';

import { CidadaoPage } from './cidadao.page';
import { AuthService } from 'src/services/domain/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CidadaoPageRoutingModule
  ],
  declarations: [CidadaoPage],
  providers: [AuthService]
})
export class CidadaoPageModule {}
