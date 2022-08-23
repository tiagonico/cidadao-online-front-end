import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';
import { TipoSolicitacaoService } from 'src/services/domain/tipo-solicitacao.service';

@Component({
  selector: 'app-inicio-gestor',
  templateUrl: './inicio-gestor.page.html',
  styleUrls: ['./inicio-gestor.page.scss'],
})
export class InicioGestorPage implements OnInit{

  constructor(private solicitacaoService: SolicitacaoService,private router: Router,private tipoSolicitacaoService: TipoSolicitacaoService) { 

  }

  items = []
  tiposSolicitacao = []

  currentTipoSolicitacao = "Todos";
  currentStatus = "Todos";

  showFilter: boolean = false;

  ngOnInit() {
      
    this.tipoSolicitacaoService.findAll().subscribe(res=>{
      this.tiposSolicitacao = res;
      console.log(res);
    });
    

    this.solicitacaoService.findAll()
    .subscribe(response => {
      this.items = response;
      console.log("minhas solicitacoes: ",response);
    },
    error => {
      console.log(error);
    });

  }

  statusToInt(status:string){
    switch(status){
      case "Solicitado":
        return 1;
      case "Em andamento":
        return 2;
      case "Concluído":
        return 3;
      case "Rejeitado":
        return 4;
      default:
        return 0;
    }
  }

  filtro(){
    var filter:string = ""
    if(this.currentTipoSolicitacao != "Todos"){
      filter = filter + `tipoSolicitacao.nome: '${this.currentTipoSolicitacao}'`;
    }
    if(this.currentStatus != "Todos"){
      filter = filter + (filter == "" ? "" : " and ") +`status: ${this.statusToInt(this.currentStatus)}` ;
    }

    //console.log("filter",filter)
    this.solicitacaoService.search(filter).subscribe(res=>{
      console.log("res:",res)
      this.items = res;
    })
  }

  detalhe(item: any) {
    console.log(item)
    let navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
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
    this.router.navigate(['/inicio-gestor-detalhe'],navigationExtras);  
  }

  reloadCurrentPage() {
    //window.location.reload();
  }

  handleChangeTipoSolicitacao(ev) {
    this.currentTipoSolicitacao = ev.target.value;
  }
  handleChangeStatus(ev) {
    this.currentStatus = ev.target.value;
  }

}
