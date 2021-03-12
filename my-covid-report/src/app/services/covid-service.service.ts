import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SummaryGobal } from '../models/summary-global.model';

@Injectable({
  providedIn: 'root'
})
export class CovidServiceService {

  baseUrl = 'https://api.covid19api.com';

  constructor(private http: HttpClient) { }

  getSummary() {
    return this.http.get<SummaryGobal[]>(this.baseUrl + '/summary');
  }
}
