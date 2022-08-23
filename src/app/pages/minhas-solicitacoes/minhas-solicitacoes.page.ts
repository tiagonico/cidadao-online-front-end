import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-minhas-solicitacoes',
  templateUrl: './minhas-solicitacoes.page.html',
  styleUrls: ['./minhas-solicitacoes.page.scss'],
})
export class MinhasSolicitacoesPage implements OnInit {

  constructor(public storage: StorageService,private router: Router,private solicitacaoService: SolicitacaoService) { }

  items = []


  ngOnInit() {

    this.solicitacaoService.findByCpf(this.storage.getLocalUser().cpf)
    .subscribe(response => {
      this.items = response;
      console.log("minhas solicitacoes: ",response);   
      
    },
    error => {
      console.log(error);
    });
  }


  detalhe(item: any) {
    console.log(item)
    let navigationExtras: NavigationExtras = {
      state: {
        nome: item.tipoSolicitacao.nome,
        endereco: item.endereco,
        descricao: item.descricao,
        status: item.status,
        dataSolicitacao: item.dataSolicitacao,
        motivo: item.motivoRejeicao,
        latitude: item.latitude,
        longitude: item.longitude,
        imgUrl: item.imgUrl
      }
    };
    this.router.navigate(['/minha-solicitacao-detalhe'],navigationExtras);
    //this.router.navigate(['/minha-solicitacao-detalhe']);    
  }

}
