import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// FusionCharts setup
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { MatTabsModule } from '@angular/material/tabs';

// Importing Chart Components
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PiechartComponent } from './piechart/piechart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HttpClientModule } from '@angular/common/http';
import ExcelExport from 'fusioncharts/fusioncharts.excelexport';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StackedBarchartComponent } from './stacked-barchart/stacked-barchart.component';

FusionCharts.addDep(Charts);
FusionCharts.addDep(FusionTheme);
FusionCharts.addDep(ExcelExport);


// Register FusionCharts modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    PiechartComponent,
    DoughnutChartComponent,
    LineChartComponent,
    StackedBarchartComponent

  ],
  imports: [
    BrowserModule,
    FusionChartsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
