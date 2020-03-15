import { Component } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'world-clock-container',
  templateUrl: './world-clock-container.component.html',
})
export class WorldClockComponent {
  public defaultTimeZone: string = '';
  dimension: string = "400px";
  public timeZones: string[] = moment.tz.names();
}
