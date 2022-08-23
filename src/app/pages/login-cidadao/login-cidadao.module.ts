import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginCidadaoPageRoutingModule } from './login-cidadao-routing.module';

import { LoginCidadaoPage } from './login-cidadao.page';
import { AuthService } from 'src/services/domain/auth.service';
import { NgxMaskModule } from 'ngx-mask';
import { MaskPipe } from 'ngx-mask';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginCidadaoPageRoutingModule,
    NgxMaskModule
  ],
  declarations: [LoginCidadaoPage],
  providers: [AuthService,MaskPipe]
})
export class LoginCidadaoPageModule {}
