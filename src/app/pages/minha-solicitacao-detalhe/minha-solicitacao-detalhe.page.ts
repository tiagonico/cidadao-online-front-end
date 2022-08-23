import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

@Component({
  selector: 'app-minha-solicitacao-detalhe',
  templateUrl: './minha-solicitacao-detalhe.page.html',
  styleUrls: ['./minha-solicitacao-detalhe.page.scss'],
})
export class MinhaSolicitacaoDetalhePage implements OnInit {

  nome: string = ""
  descricao: string = ""
  dataSolicitacao: string = ""
  status: string = ""
  endereco: string = ""
  motivo: string = ""
  latitude: string = ""
  longitude: string = ""
  imgUrl: string = null

  map: L.Map;
  marker: Marker;
  lat: number;
  lng: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    const data = this.router.getCurrentNavigation().extras.state;
    console.log(data);
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
