import { Component } from '@angular/core';
import * as moment from 'moment-timezone';
import { ClockData } from 'src/app/models/clock-data';
import { ThemeService } from 'src/app/providers/theme.service';
import { Theme } from 'src/app/models/enums';

@Component({
  selector: 'world-clock-container',
  templateUrl: './world-clock-container.component.html'
})
export class WorldClockComponent {
  defThemeClass: String;
  public clocks: Array<ClockData> = [
    new ClockData("America/New_York", 250),
    new ClockData("Australia/Sydney", 250),
    new ClockData("Mexico/General", 250),

    // new ClockData("America/New_York", 250),
    // new ClockData("Australia/Sydney", 250),
    // new ClockData("Mexico/General", 250),
  ];
  
  public defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  dimension = 300;
  public timeZones: string[] = moment.tz.names();
  defaultTheme: any;

  constructor(public themeService: ThemeService){
    themeService.currentTheme$.subscribe((theme: Theme)=>{
      this.defaultTheme = theme;
      let defaultThemeClass:String = themeService.getThemeClass(theme);
      this.defThemeClass = defaultThemeClass;
    });
  }
  
  public getThemeName(theme: Theme)
  {
    return Theme[theme];
  }

  public notifyThemeProvider(theme: Theme): void {
    this.themeService.notifyNewTheme(theme);
  }
}