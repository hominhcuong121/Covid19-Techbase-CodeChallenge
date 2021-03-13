import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AllWorld } from '../models/all-world.model';
import { CovidServiceService } from '../services/covid-service.service';

@Component({
  selector: 'app-all-world',
  templateUrl: './all-world.component.html',
  styleUrls: ['./all-world.component.css']
})
export class AllWorldComponent implements OnInit  {

  tableLabel = 'Filter';
  country = 'Country';
  newConfirmed = 'New Confirmed';
  totalConfirmed = 'Total Confirmed';
  newDeaths = 'New Deaths';
  totalDeaths = 'Total Deaths';
  newRecovered = 'New Recovered';
  totalRecovered = 'Total Recovered';
  // detail = 'Detail';
  allWorld = [];
  dataSource: MatTableDataSource<AllWorld>;
  displayedColumns: string[] = ['Country', 'NewConfirmed', 'TotalConfirmed', 'NewDeaths', 'TotalDeaths', 'NewRecovered', 'TotalRecovered'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private summaryService: CovidServiceService) {}

  ngOnInit(): void {
    this.getSummaryGlobal();
  }

  getSummaryGlobal() {
    this.summaryService.getSummary().subscribe(
      res => {
        const summaryAllWorldData = res['Countries'];
        summaryAllWorldData.forEach(country => {
          const info: AllWorld = {
            ID: country['ID'],
            Country: country['Country'],
            CountryCode: country['CountryCode'],
            Slug: country['Slug'],
            NewConfirmed: country['NewConfirmed'],
            TotalConfirmed: country['TotalConfirmed'],
            NewDeaths: country['NewDeaths'],
            TotalDeaths: country['TotalDeaths'],
            NewRecovered: country['NewRecovered'],
            TotalRecovered: country['TotalRecovered'],
            Date: country['Date'],
            Premium: country['Premium']
          };
          this.allWorld.push(info);
        });
        this.dataSource = new MatTableDataSource(this.allWorld);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        if (error.ok === false) {
          alert('Error while getting data, will automaticlly get every 05 seconds');
          setTimeout(() => {
            this.getSummaryGlobal();
          }, 5000);
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
