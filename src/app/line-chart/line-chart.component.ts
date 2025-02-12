import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  standalone:false
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any;
  @Input() chartCaption:string='';
  dataSource: object = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['Chartdata'] && this.Chartdata) {
      this.updateChart();
    }
  }

  updateChart() {
    this.dataSource = {
      chart: {
        caption: this.chartCaption,
        subCaption: "Dynamic Data Update",
        xAxisName: "X-Axis",
        yAxisName: "Y-Axis",
        numberSuffix: "",
        theme: "fusion",
        exportEnabled: "1", 
        exportFormats: "PNG|JPG|PDF|SVG|CSV",
        exportFileName: "revenue_split_report"
        
      },
      data: this.Chartdata
    };
  }

  ngAfterViewInit() {
    if (!this.chartObj) {
      console.error("Chart instance is not available yet.");
    }
  }
  downloadChart() {
    const chartInstance = this.chartObj?.chartObj;  // Get the chart instance
    if (chartInstance) {
      chartInstance.exportChart({ exportFormat: "png" });
    } else {
      console.error("Chart instance is undefined.");
    }
  }
}
