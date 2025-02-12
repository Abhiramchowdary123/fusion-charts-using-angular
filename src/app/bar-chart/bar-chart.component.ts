import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  standalone:false
})
export class BarChartComponent implements AfterViewInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any[] = [];  
  @Input() chartCaption:string='';
  dataSource: any = {
    chart: {
      caption: this.chartCaption,
      subCaption: "2017-18",
      xAxisName: "Country",
      yAxisName: "Reserves (MMbbl)",
      numberSuffix: "K",
      theme: "fusion",
      exportEnabled: "1",
      exportFormats: "PNG|JPG|PDF|SVG|CSV",
      exportFileName: "oil_reserves_report"
    },
    data: this.Chartdata
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['Chartdata'] && this.Chartdata) {
      this.updateChart();
    }
  }

  updateChart() {
    this.dataSource.chart.caption = this.chartCaption; 

    this.dataSource.data = this.Chartdata;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.chartObj) {
        console.error("Chart instance is not available yet.");
      }
    });
  }

  downloadChart() {
    const chartInstance = this.chartObj?.chartObj;
    if (chartInstance) {
      chartInstance.exportChart({ exportFormat: "png" });
    } else {
      console.error("Chart instance is undefined.");
    }
  }
}
