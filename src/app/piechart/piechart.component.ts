import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-piechart',
  standalone: false,
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements AfterViewInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any = [];  // Can be an object or an array
  @Input() Charttype: string = "pie2d"; // Default value if not provided
  dataSource: any = {};  // Initialize to avoid undefined issues

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log("🔹 Received Chartdata:", this.Chartdata); // Debugging

    if (changes['Chartdata'] && this.Chartdata) {
      // Convert object to array if needed
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
   * ✅ Converts object data to an array and maps it correctly
   */
  formatChartData(data: any): any[] {
    if (Array.isArray(data)) {
      return data; // Return as-is if already an array
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
      console.error("⚠️ No valid data for Pie Chart");
      return;
    }
 type:this.Charttype;
    this.dataSource = {
      chart: {
        type :this.Charttype,
        bgColor: "#ffffff",
        startingAngle: "310",
        showLegend: "1",         // Enable legend
        legendPosition: "right", // Move legend to the right
        alignLegendWithCanvas: "1", // Align with the chart
        centerLabel: "Revenue from label: value",
        centerLabelBold: "1",
        showTooltip: "0",
        decimals: "0",
        theme: "fusion",
        width: "100%",   // Adjust width (px or percentage)
        height: "100%",
        pieRadius: "180",
          defaultAnimation: "1",  // Enable default animations
  animationDuration: "2",
  showPercentValues: "1",
  showValues: "1",         // Hide absolute values
  showLabels: "0",
  enableSmartLabels: "1",  // ✅ Prevent overlapping labels
  useDataPlotColorForLabels: "1", // ✅ Text color same as slice
  enableSlicing: "0", // Enable slice animation
 showToolTip: "1",  // ✅ Enable hover tooltips
      interactiveLegend: "1",
  smartLineColor: "#ff0000",
        exportEnabled: "1",
        exportFormats: "PNG|JPG|PDF|SVG|CSV",
        exportFileName: "revenue_report"
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
