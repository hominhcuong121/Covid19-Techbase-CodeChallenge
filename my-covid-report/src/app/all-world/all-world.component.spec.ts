import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryGobal } from '../models/summary-global.model';
import { CovidServiceService } from '../services/covid-service.service';

import { AllWorldComponent } from './all-world.component';

describe('AllWorldComponent', () => {
  let comp: AllWorldComponent;
  let fixture: ComponentFixture<AllWorldComponent>;
  let httpTestCtrl: HttpTestingController;
  let covidService: CovidServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllWorldComponent],
      imports: [HttpClientTestingModule],
      providers: [CovidServiceService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AllWorldComponent);
      comp = fixture.componentInstance;
    });
  });

  beforeEach(() => {
    covidService = TestBed.inject(CovidServiceService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestCtrl.verify();
  });

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
