import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FusionChartsComponent } from 'angular-fusioncharts';

@Component({
  selector: 'app-stacked-barchart',
  standalone: false,
  templateUrl: './stacked-barchart.component.html',
  styleUrls: ['./stacked-barchart.component.css']
})
export class StackedBarchartComponent implements AfterViewInit, OnChanges {
  @ViewChild(FusionChartsComponent) chartObj!: FusionChartsComponent;
  @Input() Chartdata: any = {};  // Accepts both Object and Array data from the parent

  dataSource: any = {};  // Stores chart config
  formattedCategories: any[] = [];  // Stores x-axis labels
  formattedDataset: any[] = [];  // Stores dataset values

  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("🔄 Received stacked Chartdata:", this.Chartdata);

    if (changes['Chartdata'] && this.Chartdata) {
      this.formatAndUpdateChart();
    } else {
      console.error("⚠️ Chartdata is empty or invalid.");
    }
  }

  formatAndUpdateChart() {
  if (!this.Chartdata || this.Chartdata.length === 0) {
    console.warn("⚠️ No valid data for Stacked Bar Chart:", this.Chartdata);

    this.dataSource = {
      chart: {
        caption: "Deployment Status",
        xAxisName: "Category",
        yAxisName: "Count",

        theme: "fusion",
        bgColor: "#FFFFFF",
        bgAlpha: "100",            // Make it fully visible
        showCanvasBg: "0",         // Hide canvas background
        canvasBgColor: "#FFFFFF",  // White canvas background
        showBorder: "0",           // No border around chart
        showCanvasBorder: "0",     // No border around canvas

        usePlotGradientColor: "0", // Disable gradient effect
        plotFillAlpha: "100",      // Ensure bars are fully colored
        divLineAlpha: "0",         // Remove grid lines
        showAlternateHGridColor: "0", // No alternate background shades
        showShadow: "0",           // Remove any shadow effects
 showToolTip: "1",  // ✅ Enable hover tooltips
      interactiveLegend: "1",
        showLegend: "1",
        legendPosition: "right",
        alignLegendWithCanvas: "1",
        legendBgColor: "#FFFFFF",  // White background for legend
        legendBorderAlpha: "0",    // No border around legend


    canvasBgAlpha: "100", // Ensure it's fully opaque

    // ✅ Ensure the plot area is also white
    plotBorderColor: "#FFFFFF",

    // ✅ Remove grid lines if needed
    showAlternateVGridColor: "0",
      },
      categories: [{ category: this.formattedCategories }],
      dataset: this.formattedDataset
    };



    setTimeout(() => {
      if (this.chartObj?.chartObj) {
        this.chartObj.chartObj.setChartData(this.dataSource, "json");
      }
    }, 200);
    return;
  }

  console.log("📊 Processing Stacked Chart Data:", this.Chartdata);

  // 🔹 Normal processing
  this.formattedCategories = this.Chartdata.map((item: any) => ({ label: item.label || "Unknown" }));
  const seriesNames = new Set<string>();

  this.Chartdata.forEach((item: { value: {}; }) => {
    if (item.value && typeof item.value === 'object') {
      Object.keys(item.value).forEach(key => seriesNames.add(key));
    }
  });

  this.formattedDataset = Array.from(seriesNames).map(seriesName => ({
    seriesname: seriesName,
    data: this.Chartdata.map((item: any) => ({ value: item.value?.[seriesName] || 0 }))
  }));

  this.dataSource = {
    chart: {

      xAxisName: "Category",
      yAxisName: "Count",
      showLegend: "1",           // Show legend
    legendPosition: "right",   // Move legend to the right
    alignLegendWithCanvas: "1", // Aligns legend properly
    showValues: "1",            // Show values inside bars
    placeValuesInside: "1",     // Place values inside the bars
    valueFontColor: "#FFFFFF",  // Set value font color for visibility
    valueFontBold: "1",         // Make the values bold
    valueFontSize: "14",        // Adjust font size for readability

      exportEnabled: "1",
      exportFormats: "PNG|JPG|PDF|SVG|CSV",
      exportFileName: "stacked_bar_chart_report",
      drawCrossLine: "1",
      palettecolors: "FF0000,008000,0000FF"  // Red for Faulty, Green for Available, Blue for Deployed
    },
    categories: [{ category: this.formattedCategories }],
    dataset: this.formattedDataset
  };

  console.log("✅ Updated Chart DataSource:", this.dataSource);

  setTimeout(() => {
    if (this.chartObj?.chartObj) {
      this.chartObj.chartObj.setChartData(this.dataSource, "json");
      this.cdr.detectChanges();
    }
  }, 200);
}
}
