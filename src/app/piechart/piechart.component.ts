import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-piechart',
  standalone: false,
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements AfterViewInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any[] = [];  // Receives data from the parent component
  @Input() chartCaption:string="";
  dataSource: object = {};  // Initialize to avoid undefined issues

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
        bgColor: "#ffffff",
        startingAngle: "310",
        showLegend: "1",
        defaultCenterLabel: "Total revenue: $64.08K",
        centerLabel: "Revenue from $label: $value",
        centerLabelBold: "1",
        showTooltip: "0",
        decimals: "0",
        theme: "fusion",
        exportEnabled: "1",  // Enables export/download
        exportFormats: "PNG|JPG|PDF|SVG|CSV",
        exportFileName: "revenue_report"
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
