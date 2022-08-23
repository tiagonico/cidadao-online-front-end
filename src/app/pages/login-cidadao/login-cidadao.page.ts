import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { MaskPipe } from 'ngx-mask';
import { CredenciaisDTO } from 'src/app/models/credenciais.dto';
import { AuthService } from 'src/services/domain/auth.service';

@Component({
  selector: 'app-login-cidadao',
  templateUrl: './login-cidadao.page.html',
  styleUrls: ['./login-cidadao.page.scss'],
})
export class LoginCidadaoPage implements OnInit {

  constructor(private loadingCtrl: LoadingController,private maskPipe: MaskPipe,private alertCtrl: AlertController,private route: Router,private menu: MenuController, private auth: AuthService) { }

  loading: any;

  creds : CredenciaisDTO = {
    cpf: "",
    senha: "",
    tipo: "CIDADAO"
  };

  credsAux : CredenciaisDTO = {
    cpf: "",
    senha: "",
    tipo: "CIDADAO"
  };
  
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
        this.route.navigate(['/cidadao/menu/inicio']);
      },
      error => {
        if(error.status == 401){
          this.loading.dismiss();
          this.showError401();
        }else{
          this.loading.dismiss();
        }
      });   
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 1000000
    });

    this.loading.present();
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

  registrar(){
    this.route.navigate(['/signup-cidadao']);
  }

  runTimeChange(event){

  }

  ngOnInit() {


  }

}
