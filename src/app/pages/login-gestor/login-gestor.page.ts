import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { MaskPipe } from 'ngx-mask';
import { CredenciaisDTO } from 'src/app/models/credenciais.dto';
import { AuthService } from 'src/services/domain/auth.service';

@Component({
  selector: 'app-login-gestor',
  templateUrl: './login-gestor.page.html',
  styleUrls: ['./login-gestor.page.scss'],
})
export class LoginGestorPage implements OnInit {

  constructor(private loadingCtrl: LoadingController,private maskPipe: MaskPipe,private alertCtrl: AlertController,private route: Router,private menu: MenuController, private auth: AuthService) { }

  loading: any;

  creds : CredenciaisDTO = {
    cpf: "",
    senha: "",
    tipo: "GESTOR"
  };

  credsAux : CredenciaisDTO = {
    cpf: "",
    senha: "",
    tipo: "GESTOR"
  };

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 1000000
    });

    this.loading.present();
  }
  
  login() {
    this.showLoading();
    console.log(this.creds);
    this.credsAux.cpf = this.creds.cpf.replace(".","").replace(".","").replace("-","");
    this.credsAux.senha = this.creds.senha;
    this.credsAux.tipo = this.creds.tipo;
    console.log(this.credsAux);

    this.auth.authenticate(this.credsAux)
      .subscribe(response => {
        console.log(response)
        this.loading.dismiss();
        this.auth.successfulLogin(response.headers.get("Authorization"));
        this.route.navigate(['/gestor']);
      },
      error => {
        if(error.status == 403){
          this.loading.dismiss();
          this.showError403();
        }
        if(error.status == 401){
          this.loading.dismiss();
          this.showError401();
        }else{
          this.loading.dismiss();
        }
      });   
  }

  async showError401() {
    let alert = this.alertCtrl.create({
      header: 'Erro!',
      subHeader: 'CPF ou senha incorretos.',
      
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
     (await alert).present();
  }

  updateWithMask(event) {  
    this.creds.cpf = this.maskPipe.transform(event.currentTarget.value, '000.000.000-00');
  }

  async showError403() {
    let alert = this.alertCtrl.create({
      header: 'Erro!',
      subHeader: 'Essa conta não possui autorização para acessar a área de gestor.',
      
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //this.router.navigate(['/cidadao/menu/inicio']);
          }
        }
      ]
    });
     (await alert).present();
  }


  ngOnInit() {

  }

}
