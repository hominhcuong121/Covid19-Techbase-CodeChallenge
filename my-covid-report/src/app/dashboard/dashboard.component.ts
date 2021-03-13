import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SummaryGobal } from '../models/summary-global.model';
import { CovidServiceService } from '../services/covid-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newConfirmed = 'New Confirmed';
  newDeaths = 'New Deaths';
  newRecovered = 'New Recovered';
  totalConfirmed = 'Total Confirmed';
  totalDeaths = 'Total Deaths';
  totalRecovered = 'Total Recovered';

  @Output() summaryGlobalDate = new EventEmitter();
  @Output() errorMessage = new EventEmitter();
  summaryGlobal: SummaryGobal;

  constructor(private summaryService: CovidServiceService) { }

  ngOnInit(): void {
    this.getSummaryGlobal();
  }

  getSummaryGlobal() {
    this.summaryService.getSummary().subscribe(
      res => {
        const summaryGlobalData = res['Global'];
        this.summaryGlobal = {
          NewConfirmed: summaryGlobalData.NewConfirmed,
          TotalConfirmed: summaryGlobalData.TotalConfirmed,
          NewDeaths: summaryGlobalData.NewDeaths,
          TotalDeaths: summaryGlobalData.TotalDeaths,
          NewRecovered: summaryGlobalData.NewRecovered,
          TotalRecovered: summaryGlobalData.TotalRecovered,
          Date: summaryGlobalData.Date,
        };
        this.summaryGlobalDate.emit(summaryGlobalData.Date);
      },
      error => {
        if (error.ok === false) {
          // alert('Error while getting data, will automaticlly get every 05 seconds');
          setTimeout(() => {
            this.getSummaryGlobal();
          }, 5000);
        }
      }
    )
  }

}

