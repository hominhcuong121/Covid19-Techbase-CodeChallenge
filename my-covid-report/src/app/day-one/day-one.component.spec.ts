import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Country } from '../models/country.model';
import { DayOneAllStatus } from '../models/day-one-all-status.model';
import { DayOne } from '../models/day-one.model';
import { SummaryGobal } from '../models/summary-global.model';
import { CovidServiceService } from '../services/covid-service.service';

describe('DayOneComponent', () => {
  let httpTestCtrl: HttpTestingController;
  let covidService: CovidServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CovidServiceService]
    });
  });

  beforeEach(() => {
    covidService = TestBed.inject(CovidServiceService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestCtrl.verify();
  });

  it('should retrive all global information', () => {
    const testSummary: SummaryGobal[] = [
      { NewConfirmed: 100282,
        TotalConfirmed: 1162857,
        NewDeaths: 5658,
        TotalDeaths: 63263,
        NewRecovered: 15405,
        TotalRecovered: 230845,
        Date: '2020-04-05T06:37:00Z'
      }
    ];
    covidService.getSummary().subscribe((summary) => {
      expect(testSummary).toBe(summary, 'should check mocked data');
    });
    const req = httpTestCtrl.expectOne(covidService.baseUrl + '/summary');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testSummary);
    httpTestCtrl.verify();
  });

  it('should retrive all country', () => {
    const testCountry: Country[] = [
      {
        Country: 'Myanmar',
        Slug: 'myanmar',
        ISO2: 'MM',
      }
    ];
    covidService.getAllCountries().subscribe((summary) => {
      expect(testCountry).toBe(summary, 'should check mocked data');
    });
    const req = httpTestCtrl.expectOne(covidService.baseUrl + '/countries');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testCountry);
    httpTestCtrl.verify();
  });

  it('should retrive all day one of all status', () => {
    const testDayOneAllStatus: DayOneAllStatus[] = [
      {
        ID: 'a8482d5e-9a24-4dcd-bb6f-f07872dde610',
        Country: 'United Kingdom',
        CountryCode: 'GB',
        Province: '',
        City: '',
        CityCode: '',
        Lat: '55.38',
        Lon: '-3.44',
        Confirmed: 2,
        Deaths: 0,
        Recovered: 0,
        Active: 2,
        Date: '2020-04-05T06:37:00Z'
      }
    ];
    const country = 'united-kingdom';
    covidService.getDayOneAllStatus(country).subscribe((summary) => {
      expect(testDayOneAllStatus).toBe(summary, 'should check mocked data');
    });
    const req = httpTestCtrl.expectOne(covidService.baseUrl + '/dayone/country/' + country);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testDayOneAllStatus);
    httpTestCtrl.verify();
  });

  it('should retrive all day one of a specific status', () => {
    const testDayOne: DayOne[] = [
      {
        Country: 'United Kingdom',
        CountryCode: 'GB',
        Province: '',
        City: '',
        CityCode: '',
        Lat: '55.38',
        Lon: '-3.44',
        Cases: 0,
        Status: 'deaths',
        Date: '2020-01-31T00:00:00Z'
      }
    ];
    const country = 'united-kingdom';
    const status = 'confirmed';
    covidService.getDayOne(country, status).subscribe((summary) => {
      expect(testDayOne).toBe(summary, 'should check mocked data');
    });
    const req = httpTestCtrl.expectOne(covidService.baseUrl + '/dayone/country/' + country + '/status/' + status)
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testDayOne);
    httpTestCtrl.verify();
  });
});
