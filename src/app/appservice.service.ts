import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  private apiUrl = 'http://103.164.161.166:9090/newsms/dashboard/loadDashBoardSubscriberTab';

  constructor(private http: HttpClient) {}

  getChartData(logintoken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${logintoken}`);  

    console.log('Fetching data from API...');
    return this.http.get<any>(this.apiUrl, { headers });
  }
}