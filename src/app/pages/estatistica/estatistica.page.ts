import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { SolicitacaoService } from 'src/services/domain/solicitacao.service';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.page.html',
  styleUrls: ['./estatistica.page.scss'],
})
export class EstatisticaPage implements OnInit {

  constructor(private solicitacaoService: SolicitacaoService) { }

  solicitacoes = []
  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Solicitado' ], [ 'Em andamento' ], ['Concluído'],['Rejeitado'] ];
  public pieChartDatasets ;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit() {

    this.solicitacaoService.findAll()
    .subscribe(response => {
      var solicitadoCount = 0;
      var emAndamentoCount = 0;
      var concluidoCount = 0;
      var rejeitadoCount = 0;

      for(var i in response){

        switch((response[i] as any).status){
          case "Solicitado":{
            solicitadoCount++;
            break;
          }
          case "Em andamento":{
            emAndamentoCount++;
            break;
          }
          case "Concluído":{
            concluidoCount++;
            break;
          }
          case "Rejeitado":{
            rejeitadoCount++;
            break;
          }
        }
      }

      this.pieChartDatasets = [ {
        data: [ solicitadoCount, emAndamentoCount, concluidoCount ,rejeitadoCount]
      } ];
      this.solicitacoes = response;
      console.log("minhas solicitacoes: ",response);
    },
    error => {
      console.log(error);
    });

  }

 
}
