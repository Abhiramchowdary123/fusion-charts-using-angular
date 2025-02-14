import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  standalone: false
})
export class LineChartComponent implements OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any = {};  // Accepts object or array

  dataSource: any = {
    chart: {

      xAxisName: "X-Axis",
      yAxisName: "Y-Axis",
      numberSuffix: "",
      theme: "fusion",
       showToolTip: "1",  // ✅ Enable hover tooltips
      interactiveLegend: "1",
      exportEnabled: "1",
      exportFormats: "PNG|JPG|PDF|SVG|CSV",
      exportFileName: "stacked_bar_chart_report",
      drawCrossLine: "1",
      palettecolors: "FF0000,008000,0000FF"
    },
    data: []  // Initially empty
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['Chartdata'] && changes['Chartdata'].currentValue) {
      console.log("lindnsdjcsdkb",this.Chartdata);
      // Convert object to array if necessary
      if (!Array.isArray(this.Chartdata)) {
        this.dataSource.data = Object.keys(this.Chartdata).map(key => ({
          label: key, // Use label instead of name for FusionCharts
          value: this.Chartdata[key]
        }));
      } else {
        this.dataSource.data = this.Chartdata;
      }

      this.updateChart();
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
