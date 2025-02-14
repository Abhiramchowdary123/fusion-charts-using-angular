import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-doughnut-chart',
  standalone: false,
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements AfterViewInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any = {};  // Data from the parent component

  dataSource: any = {};  // Initializing an empty object

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {

    if (changes['Chartdata'] && this.Chartdata) {
      // Convert object data to an array if necessary
      const formattedData = this.formatChartData(this.Chartdata);

      if (formattedData.length > 0) {
        this.Chartdata = formattedData;
        this.updateChart();
      } else {
        console.error("⚠️ Chartdata is empty or invalid. Check API response.");
      }
    }
  }

  /**
   * ✅ Converts object to array format if needed
   */
  formatChartData(data: any): any[] {
    if (Array.isArray(data)) {
      return data; // Use as-is if already an array
    }
    else if (typeof data === 'object' && data !== null) {
      return Object.keys(data).map(key => ({
        label: key,
        value: data[key]
      }));
    }
    else {
      console.error("⚠️ Invalid data format. Expected object or array:", data);
      return [];
    }
  }

  updateChart() {
    if (!this.Chartdata || this.Chartdata.length === 0) {
      console.error("⚠️ No valid data for Doughnut Chart");
      return;
    }

    this.dataSource = {
      chart: {

        numberPrefix: "$",
        bgColor: "#ffffff",
        showLegend: "1",         // Enable legend
        legendPosition: "right", // Move legend to the right
            defaultCenterLabel: "Total Revenue",
        centerLabel: "label: value",
        centerLabelBold: "1",
        showTooltip: "1",
        decimals: "2",
        theme: "fusion",
         showToolTip: "1",  // ✅ Enable hover tooltips
      interactiveLegend: "1",
        exportEnabled: "1",  // Enables export/download
        exportFormats: "PNG|JPG|PDF|SVG|CSV",
        exportFileName: "revenue_split_report"
      },
      data: this.Chartdata
    };

    console.log("✅ Updated Chart DataSource:", this.dataSource);

    setTimeout(() => { // Ensure UI updates properly
      if (this.chartObj?.chartObj) {
        this.chartObj.chartObj.setChartData(this.dataSource, "json");
        this.cdr.detectChanges();
      } else {
        console.error("❌ Chart instance is undefined.");
      }
    }, 200);
  }

  ngAfterViewInit() {
    if (!this.chartObj) {
      console.error("❌ Chart instance is not available yet.");
    } else {
      setTimeout(() => {
        this.updateChart();
      }, 200);
    }
  }

  downloadChart() {
    const chartInstance = this.chartObj?.chartObj;
    if (chartInstance) {
      chartInstance.exportChart({ exportFormat: "png" });
    } else {
      console.error("❌ Chart instance is undefined.");
    }
  }
}
