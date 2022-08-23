import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/domain/auth.service';

@Component({
  selector: 'app-cidadao',
  templateUrl: './cidadao.page.html',
  styleUrls: ['./cidadao.page.scss'],
})
export class CidadaoPage implements OnInit {

  constructor(private router: Router,private menu: MenuController,public auth: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });;
  }

  inicio(){
    this.router.navigate(['/cidadao/menu/inicio']);
    this.menu.toggle();
  }

  minhasSolicitacoes(){
    this.router.navigate(['/cidadao/menu/minhas-solicitacoes']);
    this.menu.toggle();
  }

}
