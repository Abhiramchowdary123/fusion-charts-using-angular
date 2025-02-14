import { Component, Input, ViewChild, OnChanges, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';
import { formatNumber } from 'fusioncharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  standalone: false
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any = {};

  dataSource: any = {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log("🔹 Initial Chartdata:", this.Chartdata);
    this.formatAndUpdateChart();
    console.log("cbsdjcbshd",this.Chartdata);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("🔄 Data Changed in BarChartComponent:", this.Chartdata);
    if (changes['Chartdata'] && changes['Chartdata'].currentValue) {
      this.formatAndUpdateChart();
    }
  }

  formatAndUpdateChart() {
    if (!this.Chartdata || (Array.isArray(this.Chartdata) && this.Chartdata.length === 0)) {
      console.warn("⚠️ Chartdata is missing or empty:", this.Chartdata);
      return;
    }

    let formattedData = this.Chartdata;
    if (!Array.isArray(this.Chartdata)) {
      formattedData = Object.keys(this.Chartdata).map(key => ({
        label: key,
        value: this.Chartdata[key]
      }));
    }
    formattedData = formattedData.filter((item: { value: number; }) => item.value > 0);

    this.dataSource = {
      chart: {

      theme: "fusion",
      formatNumberScale: "0", // Disable 'K' abbreviation
      exportEnabled: "1",
      type: "bar2d",
      rotateLabels: "0",
      labelDisplay: "WRAP", // Wrap long labels properly
      maxLabelWidthPercent: "20", // Prevents label overlap
      plotSpacePercent: "50", // Space between bars
      yAxisMinValue: "0",
      adjustDiv: "1",
      showToolTip: "1",  // ✅ Enable hover tooltips
      interactiveLegend: "1",// Ensures correct scaling

      exportFormats: "PNG|JPG|PDF|SVG|CSV",
      exportFileName: "bar_chart_report"
      },
      data: formattedData
    };


    setTimeout(() => {
      if (this.chartObj?.chartObj) {
        this.chartObj.chartObj.setChartData(this.dataSource, "json");
        this.cdr.detectChanges();
      } else {
        console.error("❌ Chart instance is undefined.");
      }
    }, 200); // Small delay to allow for UI update
  }

  downloadChart() {
    if (this.chartObj?.chartObj) {
      this.chartObj.chartObj.exportChart({ exportFormat: "png" });
    } else {
      console.error("❌ Chart instance is undefined.");
    }
  }
}
