import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginGestorPageRoutingModule } from './login-gestor-routing.module';

import { LoginGestorPage } from './login-gestor.page';
import { AuthService } from 'src/services/domain/auth.service';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginGestorPageRoutingModule,
    NgxMaskModule
  ],
  declarations: [LoginGestorPage],
  providers: [AuthService,MaskPipe]
})
export class LoginGestorPageModule {}
