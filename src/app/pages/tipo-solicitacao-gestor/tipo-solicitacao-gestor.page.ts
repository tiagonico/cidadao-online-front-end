import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { TipoSolicitacaoNewDTO } from 'src/app/models/tipo-solicitacao-new.dto';
import { TipoSolicitacaoService } from 'src/services/domain/tipo-solicitacao.service';
import { Camera ,CameraOptions} from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-tipo-solicitacao-gestor',
  templateUrl: './tipo-solicitacao-gestor.page.html',
  styleUrls: ['./tipo-solicitacao-gestor.page.scss'],
})
export class TipoSolicitacaoGestorPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  
  constructor(private loadingCtrl: LoadingController,private camera: Camera,private tipoSolicitacaoService:TipoSolicitacaoService,private router: Router, private alertCtrl: AlertController) { }

  items = []
  name: string;

  loading: any;
  
  picture: string = null;
  cameraOn: boolean = false;

  descricaoMinCaracter: number = 5;

  ngOnInit() {

    this.tipoSolicitacaoService.findAll().subscribe(res=>{
      this.items = res;
      console.log(res);
    });
    
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 1000000
    });

    this.loading.present();
  }

  deletar(item: any){
    console.log(item)
    this.showDeletar(item.id)
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  cancelGallery() {
    this.picture = null;
  }

  getGalleryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 600,
      targetWidth: 800
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
     }, (err) => {
      this.cameraOn = false;
     });
  
  }

  onWillDismiss(event: Event) {
  
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      
      if(this.picture == null){
        this.showPrecisaImagem();
        return;
      }
      if(ev.detail.data == undefined){
        this.showDescricaoMinima();
        return;
      }
      if(ev.detail.data.length < this.descricaoMinCaracter){
        this.showDescricaoMinima();
        return;
      }
      
      var nameFile = "ts-" + Date.now() + ".png";
      this.showLoading();
      this.tipoSolicitacaoService.uploadPicture(this.picture,nameFile)
        .subscribe(response => {
          console.log(response);
          
          var imgUrl = "https://cidadao-online.s3.sa-east-1.amazonaws.com/tipo-solicitacao/" + nameFile;
          var tipoSolicit: TipoSolicitacaoNewDTO = {nome: ev.detail.data,imgUrl: imgUrl}
          this.tipoSolicitacaoService.insert(tipoSolicit).subscribe(res =>{
            console.log(res)
            this.loading.dismiss();
            this.reloadCurrentPage();
          },
          error => {
            this.loading.dismiss();
            console.log(error);
          });
          
        },
        error => {
          this.loading.dismiss();
          this.showMessage("Erro ao enviar mensagem.");
        });

      
    }
  }

  async showMessage(message: string) {
    let alert = this.alertCtrl.create({
      header: 'Mensagem!',
      subHeader: message,
      
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
     (await alert).present();
  }

  async showDescricaoMinima() {
    let alert = this.alertCtrl.create({
      header: 'Erro!',
      subHeader: `Descrição deve ter no mínimo ${this.descricaoMinCaracter} caracteres`,
      
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
     (await alert).present();
  }

  async showPrecisaImagem() {
    let alert = this.alertCtrl.create({
      header: 'Erro!',
      subHeader: `Insira a imagem!`,
      
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
     (await alert).present();
  }

  async showDeletar(id: number) {
    let alert = this.alertCtrl.create({
      header: 'Confirmação!',
      subHeader: `Deseja deletar o tipo de solicitação?`,
      
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confimar',
          handler: () => {
            this.tipoSolicitacaoService.deletar(id).subscribe(res=>{
              console.log(res);
              
              this.items = this.items.filter(obj => obj.id !== id);
            },error =>{
              this.showError()
            });
          }
        }
      ]
    });
     (await alert).present();
  }

  async showError() {
    let alert = this.alertCtrl.create({
      header: 'Erro!',
      subHeader: 'Não foi possível deletar o tipo solicitação pois o mesmo possui solocitações relacionadas.',
      
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
     (await alert).present();
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}
