import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/domain/auth.service';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.page.html',
  styleUrls: ['./gestor.page.scss'],
})
export class GestorPage implements OnInit {

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
    this.router.navigate(['/gestor/menu/inicio']);
    this.menu.toggle();
  }

  estatistica(){
    this.router.navigate(['/gestor/menu/estatistica']);
    this.menu.toggle();
  }

  dashboard(){
    this.router.navigate(['/gestor/menu/dashboard']);
    this.menu.toggle();
  }

  tipoSolicitacao(){
    this.router.navigate(['/gestor/menu/tipo-solicitacao']);
    this.menu.toggle();
  }

}
