import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  apiUrlsub = "http://103.164.161.166:9090/newsms/dashboard/loadDashBoardSubscriberTab";
  apiurlpartner = "http://103.164.161.166:9090/newsms/dashboard/loadDashBoardPartnerTab";
  apiurlSubscription = "http://103.164.161.166:9090/newsms/dashboard/loadDashBoardSubscriptionTab";
  apiurlinventory = "http://103.164.161.166:9090/newsms/dashboard/loadDashBoardInventoryTab";
apiurlcollection="http://103.164.161.166:9090/newsms/dashboard/loadDashBoardCollectionTab";
  authTokensub = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMjYsbWFyb3RpIiwiZGV2aWNlVHlwZSI6IiIsImlzcyI6IkNvZGVKYXZhIiwiaWF0IjoxNzM5NTE0NTMyLCJleHAiOjE3Mzk2MDA5MzJ9.ThK-ZdP52h3SN8XQGa-n24mucIemRWlsB37Xc8r2-K1cu6ucL4QKUWgpjag-8xmEUGyNj5x66JLuxvAAHv4FJQ";

  barChartsubscribersCreatedLast7DaysForGraphToList: any[] = [];
  doughnutChartsubscriberReportTo: any = {};
  doughnutChartpartnerWisePreCafCountToList: any[] = [];
  barChartfranchiseWithStatusList: any[] = [];
  piechartpartnerSubscriberUniverseCounts: any = {};
  doughnutChartpartnersOnboardToList: any[] = [];
  barChartoperatorSummaryRenewalPendingCountTo: any = {};
  barChartpricePackageWiseActiveSubscriptonsCountForGraphToList: any[] = [];
  barChartliveTvPackageWiseCollectionsList: any[] = [];
  barChartbroadbandPackageWiseCollectionsList: any[] = [];
  barchartwarehouseStockCountTOList: any[] = [];
  lineChartlast7DaysDeviceAllocationList: any[] = [];
  barchartliveTvPackageWiseCollectionsList:any[]=[];
  piechartbroadbandPackageWiseCollectionsList:any[]=[];
  piechartvasPackageWiseCollectionsList: any[]=[];
  piechartoperatorSummaryCollectionCountTo: any[]=[];
  piechartpricePackageWiseActiveSubscriptonsCountForGraphToList: any[]=[];
  piechartoperatorSummaryRenewalPendingCountTo: any=[];
  piechartliveTvPackageWiseCollectionsList: any[]=[];
  piechartwarehouseStockCountTOList: any={};

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {


  }

  ngOnInit() {
    this.fetchData();
  }
  ngAfterViewInit(): void {
    this.removeFusionChartsWatermark();
  }

  fetchData() {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.authTokensub}`);
//  subscriber tab
this.http.get<any>(this.apiUrlsub, { headers }).subscribe(
  response => {
    if (response) {
      this.doughnutChartsubscriberReportTo = response.subscriberReportTo || {};  // Ensure object
      this.barChartsubscribersCreatedLast7DaysForGraphToList = (response.subscribersCreatedLast7DaysForGraphToList || []).map((element: any) => ({
        label: element.date,
        value: element.count
      }));
      console.log("Subscriber Data:", this.barChartsubscribersCreatedLast7DaysForGraphToList);
      this.cdr.detectChanges();
    }
  },
  error => console.error("❌ Error fetching subscriber data:", error)
);

//partner tab
this.http.get<any>(this.apiurlpartner, { headers }).subscribe(
  response => {
    if (response) {
      console.log("partner response",response)
      this.doughnutChartpartnerWisePreCafCountToList = response.partnerWisePreCafCountToList?.map((element: any) => ({
          label: element.partnerId,
           value: element.leadCount
      })) || [];


      let barChartfranchiseWithStatusList1=response.franchiseWithStatusList || [];
      console.log("partner response 2",barChartfranchiseWithStatusList1);
      this.barChartfranchiseWithStatusList = barChartfranchiseWithStatusList1?.map((element: any) => ({
        label: element.name,
        value: element.id
      })) || [];

      this.piechartpartnerSubscriberUniverseCounts = response.partnerSubscriberUniverseCounts || {};
       console.log("partner response 3",this.piechartpartnerSubscriberUniverseCounts);
      let doughnutChartpartnersOnboardToList1 =response.partnersOnboardToList || [];
      console.log("partner response 4",doughnutChartpartnersOnboardToList1)
      this.doughnutChartpartnersOnboardToList = doughnutChartpartnersOnboardToList1?.map((element: any) => ({
        label: element.userName,
        value: element. franchiseCount
      })) || [];

      console.log("Formatted Partner Data:", this.doughnutChartpartnerWisePreCafCountToList);
      this.cdr.detectChanges();
    }
  },
  error => console.error("Error fetching partner data:", error)
);

//  Subscription Tab

this.http.get<any>(this.apiurlSubscription, { headers }).subscribe(
  response => {
    if (response) {
      this.piechartoperatorSummaryRenewalPendingCountTo = response.operatorSummaryRenewalPendingCountTo || {};

      let piechartpricePackageWiseActiveSubscriptonsCountForGraphToList1 =response.pricePackageWiseActiveSubscriptonsCountForGraphToList || []
      this.piechartpricePackageWiseActiveSubscriptonsCountForGraphToList =piechartpricePackageWiseActiveSubscriptonsCountForGraphToList1?.map((element: any) => ({
        label: element. pricePackageName,
        value: element.count
      })) || [];
      this.piechartliveTvPackageWiseCollectionsList = response.liveTvPackageWiseCollectionsList
  ?.filter((element: any) => element.amountCollected > 0) // Remove zero values
  .map((element: any) => ({
    label: element.pricePackageName || "Unknown",
    value: element.amountCollected || 0
  }))
  .sort((a: { value: number }, b: { value: number }) => b.value - a.value); // Sort in descending order

// Ensure the second list is also filtered & sorted properly
this.piechartliveTvPackageWiseCollectionsList = [...this.piechartliveTvPackageWiseCollectionsList];


      this.piechartbroadbandPackageWiseCollectionsList = response.broadbandPackageWiseCollectionsList?.map((element: any) => ({
        label: element.pricePackageName,
        value: element.amountCollected
      })) || [];

      console.log("Formatted Subscription Data:", this.barChartpricePackageWiseActiveSubscriptonsCountForGraphToList);
      this.cdr.detectChanges();
    }
  },
  error => console.error("Error fetching subscription data:", error)
);
//inventory
this.http.get<any>(this.apiurlinventory, { headers }).subscribe(
  response => {
    if (response) {

      this.barchartwarehouseStockCountTOList = response.warehouseStockCountTOList?.map((element: any) => ({
        label: element.partnerName,
        value: {
          Available: element.totalAvailableCount || 0,
          Faulty: element.totalFaultyCount || 0,
          Deployed: element.totalDeployedCount || 0
        }
      })) || [];

      this.lineChartlast7DaysDeviceAllocationList = response.last7DaysDeviceAllocationList?.map((element: any) => ({
        label: element.date,
        value: element.count || 0
      })) || [];


      if (this.piechartwarehouseStockCountTOList.length > 0) {
        this.cdr.detectChanges();
      } else {
        console.warn("⚠️ No valid data available for Inventory.");
      }
    } else {
      console.warn("⚠️ API Response was empty or undefined.");
    }
  },
  error => console.error(" Error fetching inventory data:", error)
);

//collection tab
this.http.get<any>(this.apiurlcollection, { headers }).subscribe(response => {
  if (response) {
    console.log("📢 Collection API Response:", response); // Debug API response

    // Ensure array exists before mapping
    this.barchartliveTvPackageWiseCollectionsList = (response.liveTvPackageWiseCollectionsList || []).map((element: any) => ({
      label: element.amountCollected ,
      value: element.subscriptionCount
    }))  || [];

    this.cdr.detectChanges();


    console.log("✅ Mapped Live TV Package Collections:", this.barchartliveTvPackageWiseCollectionsList);

    this.piechartbroadbandPackageWiseCollectionsList = (response.broadbandPackageWiseCollectionsList || []).map((element: any) => ({
      label: element.pricePackageName || "Unknown",
      value: element.amountCollected ?? 0
    }));

    this.piechartvasPackageWiseCollectionsList = (response.vasPackageWiseCollectionsList || []).map((element: any) => ({
      label: element.pricePackageName || "Unknown",
      value: element.amountCollected ?? 0
    }));

    this.piechartoperatorSummaryCollectionCountTo = response.operatorSummaryCollectionCountTo || {};

    this.cdr.detectChanges(); // Update UI after data change
  } else {
    console.warn("⚠️ No data received from Collection API.");
  }
}, error => console.error("❌ Error fetching Collection data:", error));

  }
  removeFusionChartsWatermark() {
    const style = document.createElement('style');
    style.innerHTML = `
      g[transform^="translate"][fill="#b1b2b7"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // Use MutationObserver to remove dynamically generated watermark
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const watermark = document.querySelector('g[transform^="translate"][fill="#b1b2b7"]');
        if (watermark) {
          watermark.remove(); // Remove watermark
          observer.disconnect(); // Stop observing once removed
        }
      });
    });

    // Start observing the chart container
    const chartContainer = document.querySelector('.fusioncharts-container');
    if (chartContainer) {
      observer.observe(chartContainer, { childList: true, subtree: true });
    }

    // Fallback: Remove watermark after a short delay
    setTimeout(() => {
      const watermark = document.querySelector('g[transform^="translate"][fill="#b1b2b7"]');
      if (watermark) {
        watermark.remove();
      }
    }, 1000);
  }

  pie2d: string = "pie2d";
  pie3d: string = "pie3d";
}
