import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { SummaryGobal } from '../models/summary-global.model';
import { CovidServiceService } from '../services/covid-service.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpTestCtrl: HttpTestingController;
  let covidService: CovidServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CovidServiceService]
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      comp = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    covidService = TestBed.inject(CovidServiceService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestCtrl.verify();
  });

  it('should have as text `New Confirmed`', async(() => {
    expect(comp.newConfirmed).toEqual('New Confirmed');
  }));

  it('should have as text `New Deaths`', async(() => {
    expect(comp.newDeaths).toEqual('New Deaths');
  }));

  it('should have as text `New Recovered`', async(() => {
    expect(comp.newRecovered).toEqual('New Recovered');
  }));

  it('should have as text `Total Confirmed`', async(() => {
    expect(comp.totalConfirmed).toEqual('Total Confirmed');
  }));

  it('should have as text `Total Deaths`', async(() => {
    expect(comp.totalDeaths).toEqual('Total Deaths');
  }));

  it('should have as text `Total Recovered`', async(() => {
    expect(comp.totalRecovered).toEqual('Total Recovered');
  }));

  const testSummary: SummaryGobal[] = [
    { NewConfirmed: 100282,
      TotalConfirmed: 1162857,
      NewDeaths: 5658,
      TotalDeaths: 63263,
      NewRecovered: 15405,
      TotalRecovered: 230845,
      Date: '2020-04-05T06:37:00Z'
    },
    { NewConfirmed: 100282,
      TotalConfirmed: 1162857,
      NewDeaths: 5658,
      TotalDeaths: 63263,
      NewRecovered: 15405,
      TotalRecovered: 230845,
      Date: '2020-04-05T06:37:00Z'
    }
  ];

  it('should retrive all global information', () => {
    covidService.getSummary().subscribe((summary) => {
      expect(testSummary).toBe(summary, 'should check mocked data');
    });
    const req = httpTestCtrl.expectOne(covidService.baseUrl + '/summary');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testSummary);
    httpTestCtrl.verify();
  });
});
