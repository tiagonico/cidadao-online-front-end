import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { SolicitacaoNewDTO } from 'src/app/models/solicitacao-new.dto';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { StorageService } from 'src/services/storage.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

//import 'leaflet/dist/images/marker-shadow.png'

@Component({
  selector: 'app-nova-solicitacao',
  templateUrl: './nova-solicitacao.page.html',
  styleUrls: ['./nova-solicitacao.page.scss'],
})
export class NovaSolicitacaoPage implements OnInit {

  descricaoMinCaracter: number = 20;

  tipo: string;
  id: number;
  imgUrl: string;

  lat: number = -20.33828367093493;
  lng: number = -40.38359575874648;

  map: L.Map;
  marker: Marker;

  picture: string = null;
  cameraOn: boolean = false;
  loading: any;

  solicitNew: SolicitacaoNewDTO = {
    descricao: "",
    endereco: "",
    tipoSolicitacaoId: 0,
    cpf: "",
    latitude: "",
    longitude: "",
    imgUrl: ""
  };

  constructor(private camera: Camera, private loadingCtrl: LoadingController, public http: HttpClient, private geolocation: Geolocation, public plt: Platform, public storage: StorageService, private route: ActivatedRoute, private router: Router, private solicitacaoService: SolicitacaoService, private alertCtrl: AlertController) {
    const data = this.router.getCurrentNavigation().extras.state;
    this.tipo = data.nome;
    this.id = data.id;
    this.imgUrl = data.imgUrl;
    const iconRetinaUrl = 'assets/marker/marker-icon-2x.png';
    const iconUrl = 'assets/marker/marker-icon.png';
    const shadowUrl = 'assets/marker/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Solicitando...',
      duration: 1000000
    });

    this.loading.present();
  }

  ngOnInit() {


    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

      this.loadLeafletMap();

      this.marker = L.marker({ lat: this.lat, lng: this.lng }, { draggable: true });
      this.marker.addTo(this.map);


      console.log(resp);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.loadLeafletMap();

      this.marker = L.marker({ lat: this.lat, lng: this.lng }, { draggable: true });
      this.marker.addTo(this.map);
    });


  }

  sendPicture() {
    var nameFile = "s-" + Date.now() + ".png";

    this.solicitacaoService.uploadPicture(this.picture, nameFile)
      .subscribe(response => {
        console.log(response);
      },
        error => {
        });
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 600,
      targetWidth: 800,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
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

  cancel() {
    this.picture = null;
  }


  solicitar() {

    if (this.solicitNew.descricao.length < this.descricaoMinCaracter) {
      this.showDescricaoMinima();
      return;
    }

    this.showLoading();

    //var url = "https://geocode.xyz/"+this.marker.getLatLng().lat+","+this.marker.getLatLng().lng+"?json=1";
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.marker.getLatLng().lat},${this.marker.getLatLng().lng}&key=${environment.googleAPIKey}&region=pt_BR`
    this.http.get(url).subscribe(resp => {
      var endereco = (resp as any).results[0].formatted_address;
      var splitted = endereco.split(",", 3);
      var enderecoFinal = splitted[0] + ", " + splitted[1] + ", " + splitted[2]
      try {

        this.solicitNew.latitude = this.marker.getLatLng().lat + "";
        this.solicitNew.longitude = this.marker.getLatLng().lng + "";
        this.solicitNew.endereco = enderecoFinal;
        this.solicitNew.tipoSolicitacaoId = this.id;
        this.solicitNew.cpf = this.storage.getLocalUser().cpf;
        this.solicitNew.imgUrl = null;

        if (this.picture != null) {

          var nameFile = "s-" + Date.now() + ".png";

          this.solicitacaoService.uploadPicture(this.picture, nameFile)
            .subscribe(response => {
              this.solicitNew.imgUrl = "https://cidadao-online.s3.sa-east-1.amazonaws.com/solicitacao/" + nameFile;

              console.log(this.solicitNew);
              this.solicitacaoService.insert(this.solicitNew)
                .subscribe(response => {

                  this.loading.dismiss();
                  this.showInsertOk();
                },
                error => {
                  this.loading.dismiss();
                });
              console.log(response);
            },
            error => {
              this.loading.dismiss();
              this.showErroImagem();
            });
        } else {

          console.log(this.solicitNew);
          this.solicitacaoService.insert(this.solicitNew)
            .subscribe(response => {

              this.loading.dismiss();
              this.showInsertOk();
            },
            error => {
              this.loading.dismiss();
            });
        }
      } catch (err) {
        this.loading.dismiss();
        console.log(err);
      }
    },
    error => {
      this.loading.dismiss();
      this.showErroDesconhecido();
    });

  }


  loadLeafletMap() {

    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 15,
      renderer: L.canvas()
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map)

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

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

  async showErroImagem() {
    let alert = this.alertCtrl.create({
      header: 'Erro!',
      subHeader: `Erro ao enviar a imagem.`,

      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    (await alert).present();
  }

  async showErroDesconhecido() {
    let alert = this.alertCtrl.create({
      header: 'Erro desconhecido!',
      subHeader: `Por favor, relatar o bug aos desenvolvedores.`,

      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    (await alert).present();
  }

  async showInsertOk() {
    let alert = this.alertCtrl.create({
      header: 'Sucesso!',
      subHeader: 'Solicitação efetuado com sucesso',

      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/cidadao/menu/inicio']);
          }
        }
      ]
    });
    (await alert).present();
  }
}
