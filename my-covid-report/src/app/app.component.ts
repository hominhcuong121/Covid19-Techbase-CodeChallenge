import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-covid-report';
  GlobalDate: Date;
  error: boolean = false;

  summaryGlobalDate($event) {
    this.GlobalDate = $event;
  }

  errorMessage($event) {
    this.error = $event;
  }
}
