import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  
  map: L.Map;
  marker: Marker;
  itens = []
  lat: number;
  lng: number;

  constructor(private solicitacaoService: SolicitacaoService,private geolocation: Geolocation) { 
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

    //this.geolocation.getCurrentPosition().then((resp) => {
      //this.lat = resp.coords.latitude;
      //this.lng = resp.coords.longitude;

      this.lat = -20.33828367093493;
      this.lng = -40.38359575874648;

      this.loadLeafletMap();

      this.solicitacaoService.findAll()
      .subscribe(response => {
        this.itens = response;
        console.log("minhas solicitacoes: ",response);

        for(var i in response){
        
          var latitude : number= (response[i] as any).latitude 
          var longitude : number= (response[i] as any).longitude 
          var nome : string= (response[i] as any).tipoSolicitacao.nome
          var marker =  L.marker({lat: latitude, lng: longitude});
          marker.bindPopup(nome,{
            closeButton: false,
            closeOnClick: true
          })
          marker.addTo(this.map);
          
        }
      },
      error => {
        console.log(error);
      });

    //   console.log(resp);
    //   }).catch((error) => {
    //     console.log('Error getting location', error);
    // });
    
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
