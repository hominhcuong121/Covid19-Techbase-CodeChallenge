import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COVID 19 REPORT';
  GlobalDate: Date;
  error = false;

  summaryGlobalDate($event) {
    this.GlobalDate = $event;
  }

  errorMessage($event) {
    this.error = $event;
  }
}
