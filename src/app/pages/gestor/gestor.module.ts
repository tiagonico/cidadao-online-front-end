import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestorPageRoutingModule } from './gestor-routing.module';

import { GestorPage } from './gestor.page';
import { AuthService } from 'src/services/domain/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestorPageRoutingModule
  ],
  declarations: [GestorPage],
  providers: [AuthService]
})
export class GestorPageModule {}
