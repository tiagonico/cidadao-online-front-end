import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StorageService } from 'src/services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot()],   
    
  providers: [StorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SolicitacaoService,
    AuthInterceptorProvider,
    AndroidPermissions
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
