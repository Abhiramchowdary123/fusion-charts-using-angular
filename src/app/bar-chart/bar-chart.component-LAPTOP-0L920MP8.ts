import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  standalone: false
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any = {};  // Expecting object data from parent

  dataSource: any = {
    chart: {
      caption: "Bar Chart Report",
      xAxisName: "Category",
      yAxisName: "Count",
      numberSuffix: "",
      theme: "fusion",
      exportEnabled: "1",
      exportFormats: "PNG|JPG|PDF|SVG|CSV",
      exportFileName: "bar_chart_report"
    },
    categories: [
      {
        category: []
      }
    ],
    dataset: [
      {
        seriesname: "Data",
        data: this.Chartdata
      }
    ]
  };

  constructor() {}
  ngOnInit(): void {
    console.log("Received Chartdata1:", this.Chartdata); // Debugging

    this.dataSource.categories[0].category = Object.keys(this.Chartdata).map(key => ({ label: key }));
      this.dataSource.dataset[0].data = Object.values(this.Chartdata).map(value => ({ value: value }));

      console.log("Formatted Data: ", this.dataSource); // Debugging
      this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Received Chartdata:", this.Chartdata); // Debugging

    if (changes['Chartdata'] && changes['Chartdata'].currentValue) {
      this.dataSource.categories[0].category = Object.keys(this.Chartdata).map(key => ({ label: key }));
      this.dataSource.dataset[0].data = Object.values(this.Chartdata).map(value => ({ value: value }));

      console.log("Formatted Data: ", this.dataSource); // Debugging
      this.updateChart();
    } else {
      console.error("Chartdata is missing or empty:", this.Chartdata);
    }
  }

  updateChart() {
    if (this.chartObj?.chartObj) {
      this.chartObj.chartObj.setChartData(this.dataSource, "json");
    }
  }

  downloadChart() {
    if (this.chartObj?.chartObj) {
      this.chartObj.chartObj.exportChart({ exportFormat: "png" });
    } else {
      console.error("Chart instance is undefined.");
    }
  }
}
