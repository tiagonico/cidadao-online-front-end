import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MaskPipe } from 'ngx-mask';
import { UsuarioService } from 'src/services/domain/usuario.service';

@Component({
  selector: 'app-signup-cidadao',
  templateUrl: './signup-cidadao.page.html',
  styleUrls: ['./signup-cidadao.page.scss'],
})
export class SignupCidadaoPage implements OnInit {

  formGroup: FormGroup;
  loading: any;

  creds= {
    nome: "",
    email: "",
    cpf: "",
    senha: ""
  };

  constructor(private loadingCtrl: LoadingController,private maskPipe: MaskPipe,private router: Router,private alertCtrl: AlertController,public usuarioService: UsuarioService,public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      cpf : ['', [Validators.required]],
      senha : ['', [Validators.required]]
         
    }); 

  }



  ngOnInit() {
  }

  updateWithMask(event) {  
    this.formGroup.get('cpf').setValue(this.maskPipe.transform(event.currentTarget.value, '000.000.000-00'));
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 1000000
    });

    this.loading.present();
  }


  signupUser() {
    this.showLoading();
    console.log(this.formGroup)
    var aux:string = this.formGroup.get('cpf').value
    this.creds.cpf = aux.replace(".","").replace(".","").replace("-","");
    this.creds.email = this.formGroup.get('email').value
    this.creds.senha = this.formGroup.get('senha').value
    this.creds.nome = this.formGroup.get('nome').value
    console.log(this.creds)
    
    this.usuarioService.insert(this.creds)
    .subscribe(response => {
      this.loading.dismiss();
      this.showInsertOk();
    },
    error => {
      if(error.status == 500){
        this.loading.dismiss();
        this.showError500();
      }
    });
  }

  async showError500() {
    let alert = this.alertCtrl.create({
      header: 'Erro!',
      subHeader: 'CPF ou email já sendo utilizados.',
      
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

  async showInsertOk() {
    let alert = this.alertCtrl.create({
      header: 'Sucesso!',
      subHeader: 'Conta criada com sucesso',
      
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/login-cidadao']);
          }
        }
      ]
    });
     (await alert).present();
  }

}
