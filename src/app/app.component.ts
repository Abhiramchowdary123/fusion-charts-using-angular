import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppserviceService } from './appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'angularCharts';
  Chartdata: any;
  logintoken: string = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMjYsbWFyb3RpIiwiZGV2aWNlVHlwZSI6IiIsImlzcyI6IkNvZGVKYXZhIiwiaWF0IjoxNzM5MjczNDQ2LCJleHAiOjE3MzkzNTk4NDZ9.sLyTq9BhNW5Ch-mW9xhasSnqQjA8jjQehmaDUg3PkPKicRIe6MOakho9gAC4DKFGJb9HZ5V2-jgrhHXTjYCGzQ';

  constructor(private appservice: AppserviceService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.appservice.getChartData(this.logintoken).subscribe(
      (response: any) => {
        console.log('API Response:', response);
        let obj=response.subscriberReportTo;
        console.log("new respnse",obj);
        
        const rawData = response?.subscribersCreatedLast7DaysForGraphToList;
        
        if (Array.isArray(rawData)) {
          this.Chartdata = rawData.map(item => ({
            label: item.date || "Unknown", 
            value: item.count || 0 
          }));

          this.cd.detectChanges();
        } else {
          console.error("Unexpected API response format:", response);
        }
      },
      (error: any) => console.error('Error fetching data:', error) 
    );
  }
  chartCaption = "Corpus Enterpises";
  // chartCaptionline="Line Chart Example";

}
