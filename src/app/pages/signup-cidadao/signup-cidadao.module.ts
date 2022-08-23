import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { SignupCidadaoPageRoutingModule } from './signup-cidadao-routing.module';

import { SignupCidadaoPage } from './signup-cidadao.page';
import { UsuarioService } from 'src/services/domain/usuario.service';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupCidadaoPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule
  ],
  declarations: [SignupCidadaoPage],
  providers: [FormBuilder,UsuarioService,MaskPipe]
})
export class SignupCidadaoPageModule {}
