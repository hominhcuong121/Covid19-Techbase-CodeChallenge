import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { SummaryGobal } from '../models/summary-global.model';

@Injectable({
  providedIn: 'root'
})
export class CovidServiceService {

  private baseUrl = 'https://api.covid19api.com';

  constructor(private http: HttpClient) { }

  getSummary() {
    return this.http.get(this.baseUrl + '/summary');
  }
}
