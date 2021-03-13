import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from '../models/country.model';
import { DayOneAllStatus } from '../models/day-one-all-status.model';
import { DayOne } from '../models/day-one.model';
import { CovidServiceService } from '../services/covid-service.service';

@Component({
  selector: 'app-day-one',
  templateUrl: './day-one.component.html',
  styleUrls: ['./day-one.component.css']
})
export class DayOneComponent implements OnInit {

  all = 'all';
  confirmed = 'confirmed';
  recovered = 'recovered';
  deaths = 'deaths';
  selectedCountry = '';
  selectedStatus = '';
  invalidSelection = false;
  statusIsAll: boolean;
  dayOneAllStatusData = [];
  dayOneData = [];
  countryList: Country[] = [];
  statusList = [this.all, this.confirmed, this.recovered, this.deaths];
  dataSourceDayOne: MatTableDataSource<DayOne>;
  dataSourceDayOneAllStatus: MatTableDataSource<DayOneAllStatus>;
  displayedColumnsDayOne: string[] = ['Country', 'CountryCode', 'Province', 'Lat', 'Lon', 'Cases', 'Status', 'Date'];
  displayedColumnsAllStatus: string[] = ['Country', 'CountryCode', 'Province', 'Lat', 'Lon', 'Confirmed', 'Deaths', 'Recovered', 'Active', 'Date'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private summaryService: CovidServiceService) { }

  ngOnInit(): void {
    this.getCountryList();
  }

  getCountryList() {
    this.summaryService.getAllCountries().subscribe(
      res => {
        res.forEach(item => {
          const country: Country = {
            Country: item['Country'],
            Slug: item['Slug'],
            ISO2: item['ISO2']
          };
          this.countryList.push(country);
        });
      },
      error => {
        if (error.ok === false) {
          alert('Error while getting data, will automaticlly get every 05 seconds');
          setTimeout(() => {
            this.getCountryList();
          }, 5000);
        }
      }
    );
  }

  submitDayOne() {
    if (this.selectedCountry === '' || this.selectedStatus === '') {
      this.invalidSelection = true;
    } else {
      this.invalidSelection = false;
      if (this.selectedStatus === this.all) {
        this.statusIsAll = false;
        this.getDayOneAllStatus(this.selectedCountry);
      } else {
        console.log(this.selectedStatus);
        this.statusIsAll = true;
        this.getDayOne(this.selectedCountry, this.selectedStatus);
      }
    }
  }

  getDayOneAllStatus(country) {
    this.dayOneAllStatusData = [];
    this.dataSourceDayOneAllStatus = new MatTableDataSource(this.dayOneAllStatusData);
    this.summaryService.getDayOneAllStatus(country).subscribe(
      res => {
        this.dayOneAllStatusData.push(res);
        this.dataSourceDayOneAllStatus = new MatTableDataSource(this.dayOneAllStatusData);
        this.dataSourceDayOneAllStatus.paginator = this.paginator;
      },
      error => {
        if (error.ok === false) {
          alert('Error while getting data, will automaticlly get every 05 seconds');
          setTimeout(() => {
            this.getCountryList();
          }, 5000);
        }
      }
    );
  }

  getDayOne(country, status) {
    this.dayOneData = [];
    this.dataSourceDayOne = new MatTableDataSource(this.dayOneData);
    this.summaryService.getDayOne(country, status).subscribe(
      res => {
        res.forEach(item => {
          const info: DayOne = {
            Country: item['Country'],
            CountryCode: item['CountryCode'],
            Province: item['Province'],
            City: item['City'],
            CityCode: item['CityCode'],
            Lat: item['Lat'],
            Lon: item['Lon'],
            Cases: item['Cases'],
            Status: item['Status'],
            Date: item['Date'],
          };
          this.dayOneData.push(info);
        });
        this.dataSourceDayOne = new MatTableDataSource(this.dayOneData);
        this.dataSourceDayOne.paginator = this.paginator;
      },
      error => {
        if (error.ok === false) {
          alert('Error while getting data, will automaticlly get every 05 seconds');
          setTimeout(() => {
            this.getCountryList();
          }, 5000);
        }
      }
    );
  }
}
