import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { AlertController, IonModal, NavController } from '@ionic/angular';
import { SolicitacaoPut } from 'src/app/models/solicitacao-put';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

@Component({
  selector: 'app-inicio-gestor-detalhe',
  templateUrl: './inicio-gestor-detalhe.page.html',
  styleUrls: ['./inicio-gestor-detalhe.page.scss'],
})
export class InicioGestorDetalhePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  
  id: number = 0
  nome: string = ""
  descricao: string = ""
  dataSolicitacao: string = ""
  status: string = ""
  endereco: string = ""
  motivo: string = ""  
  latitude: string = ""
  longitude: string = ""
  imgUrl: string = null
  name: string;
  descricaoMinCaracter: number = 5;

  map: L.Map;
  marker: Marker;
  lat: number;
  lng: number;

  constructor(public navController: NavController,private solicitacaoService: SolicitacaoService,private route: ActivatedRoute, private router: Router,private alertCtrl: AlertController) {
    const data = this.router.getCurrentNavigation().extras.state;
    console.log(data);
    this.id = data.id,
    this.nome =data.nome;
    this.descricao = data.descricao;
    this.dataSolicitacao = data.dataSolicitacao;
    this.status = data.status;
    this.endereco = data.endereco;
    this.motivo = data.motivo;    
    this.latitude = data.latitude;
    this.longitude = data.longitude;
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    
    this.modal.dismiss(this.name, 'confirm');
    console.log(this.motivo)
  }

  onWillDismiss(event: Event) {
  
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.motivo = ev.detail.data;

      if(this.motivo == undefined){
        this.showDescricaoMinima();
        return;
      }
      if(this.motivo.length < this.descricaoMinCaracter){
        this.showDescricaoMinima();
        return;
      }

      var solicit: SolicitacaoPut = {status: 4,motivoRejeicao:  ev.detail.data}
      this.solicitacaoService.put(this.id,solicit).subscribe(res =>{
        console.log(res)
        this.router.navigate(['/gestor/menu/inicio']).then(() => {
          window.location.reload();
        });
      },
      error => {
        console.log(error);
      });
    }
  }

  ngOnInit() {

    this.lat = Number(this.latitude);
    this.lng = Number(this.longitude);

    this.loadLeafletMap();

    var marker =  L.marker({lat: this.lat, lng: this.lng});
    marker.bindPopup(this.nome,{
      closeButton: false,
      closeOnClick: true
    })
    marker.addTo(this.map);
  }

  concluido(){
    this.showConcluido();
  }

  emAndamento(){
    this.showEmAndamento();
  }

  async showEmAndamento() {
    let alert = this.alertCtrl.create({
      header: 'Confirmação!',
      subHeader: 'Deseja alterar o status da solicitação para EM ANDAMENTO?',
      
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            var solicit: SolicitacaoPut = {status: 2, motivoRejeicao: null}
            this.solicitacaoService.put(this.id,solicit).subscribe(res =>{
              console.log(res)
              this.router.navigate(['/gestor/menu/inicio']).then(() => {
                window.location.reload();
              });
            },
            error => {
              console.log(error);
            });
            
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
     (await alert).present();
  }

  async showConcluido() {
    let alert = this.alertCtrl.create({
      header: 'Confirmação!',
      subHeader: 'Deseja alterar o status da solicitação para CONCLUÍDO?',
      
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            var solicit: SolicitacaoPut = {status: 3 , motivoRejeicao: null}
            this.solicitacaoService.put(this.id,solicit).subscribe(res =>{
              console.log(res)
              
              this.router.navigate(['/gestor/menu/inicio']).then(() => {
                window.location.reload();
              });
            },
            error => {
              console.log(error);
            });
            
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
     (await alert).present();
  }

  loadLeafletMap() {
    
    this.map = L.map('map' ,{
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
}
