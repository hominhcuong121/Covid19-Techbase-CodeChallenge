import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country.model';
import { DayOneAllStatus } from '../models/day-one-all-status.model';
import { DayOne } from '../models/day-one.model';
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

  getAllCountries() {
    return this.http.get<Country[]>(this.baseUrl + '/countries');
  }

  getDayOneAllStatus(country) {
    return this.http.get<DayOneAllStatus[]>(this.baseUrl + '/dayone/country/' + country);
  }

  getDayOne(country, status) {
    console.log('huhuhuhuh', status);
    return this.http.get<DayOne[]>(this.baseUrl + '/dayone/country/' + country + '/status/' + status);
  }
}
