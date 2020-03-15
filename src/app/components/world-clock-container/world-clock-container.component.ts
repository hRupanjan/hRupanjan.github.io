import { Component } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'world-clock-container',
  templateUrl: './world-clock-container.component.html',
})
export class WorldClockComponent {
  public defaultTimeZone = '';
  dimension = "300px";
  public timeZones: string[] = moment.tz.names();
}
