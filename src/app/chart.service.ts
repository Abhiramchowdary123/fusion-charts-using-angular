import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private apiUrl = 'http://localhost:8080/api/chart/sales';  

  constructor(private http: HttpClient) {}

  getChartData(): Observable<any> {
    console.log('Fetching data from API...'); // ✅ Debug log
    return this.http.get<any>(this.apiUrl);
  }
}
