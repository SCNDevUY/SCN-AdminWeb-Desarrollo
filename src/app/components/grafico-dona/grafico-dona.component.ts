import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() etiquetas: any = ['Sin Datos1', 'Sin Datos2', 'Sin Datos3'];
  @Input() valores: any = [10, 20, 30];
  @Input() tipo: any = 'doughnut';
  @Input() leyenda: any = 'Sin Leyenda';

  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType;

  constructor() {
  }

  ngOnInit(): void {

    this.crearGrafica();

  }


  crearGrafica() {

    this.doughnutChartLabels = this.etiquetas;
    this.doughnutChartData = [ this.valores ];
    this.doughnutChartType = this.tipo;

  }

}
