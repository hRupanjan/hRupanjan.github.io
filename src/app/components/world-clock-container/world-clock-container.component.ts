import { Component } from '@angular/core';
import * as moment from 'moment-timezone';
import { ClockData } from 'src/app/models/clock-data';
import { ThemeService } from 'src/app/providers/theme.service';
import { Theme } from 'src/app/models/enums';
import { AddClockDialogComponent } from '../dialogs/add-clock-dialog/add-clock-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'world-clock-container',
  templateUrl: './world-clock-container.component.html'
})
export class WorldClockComponent {
  defThemeClass: string;
  public clocks: Array<ClockData> = [
    // new ClockData('America/New_York', 250),
  ];

  public defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  dimension = 300;
  public timeZones: string[] = moment.tz.names();
  defaultTheme: any;

  constructor(
    public themeService: ThemeService,
    private dialog: MatDialog
  ) {
    themeService.currentTheme$.subscribe((theme: Theme) => {
      this.defaultTheme = theme;
      this.defThemeClass = themeService.getThemeClass(theme);
    });
  }

  public getThemeName(theme: Theme) {
    return Theme[theme];
  }

  public notifyThemeProvider(theme: Theme): void {
    this.themeService.notifyNewTheme(theme);
  }

  public deleteClock(id: Guid) {
    this.clocks = this.clocks.filter(clock => clock.id !== id);
  }

  public onAddBtnClick() {
    const dialogRef: MatDialogRef<AddClockDialogComponent> = this.dialog.open(AddClockDialogComponent, {
      autoFocus: true,
      data: null,
    });
    dialogRef.afterClosed().subscribe((timeZone: string) => {
      if (timeZone) {
        this.clocks.push(new ClockData(timeZone, 250));
      }
    });
  }
}
