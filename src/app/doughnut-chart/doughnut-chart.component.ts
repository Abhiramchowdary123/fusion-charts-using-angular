import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-doughnut-chart',
  standalone: false,
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements AfterViewInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any[] = [];  // Data from the parent component
  @Input() chartCaption: string = ""; 
  dataSource: object = {};  // Initializing an empty object

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
        subCaption: "Last Year",
        numberPrefix: "$",
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
    const chartInstance = this.chartObj?.chartObj;
    if (chartInstance) {
      chartInstance.exportChart({ exportFormat: "png" });
    } else {
      console.error("Chart instance is undefined.");
    }
  }
}
