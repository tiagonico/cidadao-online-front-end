import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TipoSolicitacaoDTO } from 'src/app/models/tipo-solicitacao.dto';
import { TipoSolicitacaoService } from 'src/services/domain/tipo-solicitacao.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  items:TipoSolicitacaoDTO[];

  constructor(private router:Router,private tipoSolicitacaoService:TipoSolicitacaoService) { }

  ngOnInit() {

    this.tipoSolicitacaoService.findAll()
    .subscribe(response => {
      this.items = response;
      console.log(response);
    },
    error => {
      console.log(error);
    });  
  }

  novaSolicitacao(solicitacao: string,id: number,imgUrl: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        nome: solicitacao,
        id: id,
        imgUrl: imgUrl
      }
    };
    this.router.navigate(['/nova-solicitacao'],navigationExtras);    
  }

  

}
