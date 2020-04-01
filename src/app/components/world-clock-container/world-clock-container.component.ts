import { Component, OnDestroy, HostListener } from '@angular/core';
import * as moment from 'moment-timezone';
import { ClockData } from 'src/app/models/clock-data';
import { ThemeService } from 'src/app/providers/theme.service';
import { Theme } from 'src/app/models/enums';
import { AddClockDialogComponent } from '../dialogs/add-clock-dialog/add-clock-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Guid } from 'guid-typescript';
import { TabIdBaseService } from 'src/app/providers/tab-identity.service';
import { ExtrasStorageService } from 'src/app/providers/storage/extras-storage.service';

@Component({
  selector: 'world-clock-container',
  templateUrl: './world-clock-container.component.html'
})
export class WorldClockComponent implements OnDestroy {
  defThemeClass: string;
  public clocks: Array<ClockData> = [
    // new ClockData('America/New_York', 250),
  ];

  public defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  dimension = 300;
  public timeZones: string[] = moment.tz.names();
  defaultTheme: Theme;

  constructor(
    public themeService: ThemeService,
    private tabId: TabIdBaseService,
    private extraStorage: ExtrasStorageService,
    private dialog: MatDialog
  ) {
    this.clocks = extraStorage.getClocks();
    if (this.clocks == null) {
      this.clocks = Array<ClockData>();
    }
    this.tabId.apply('world');
    themeService.currentTheme$.subscribe((theme: Theme) => {
      this.defaultTheme = theme;
      this.extraStorage.setCurrentTheme(this.defaultTheme);
      this.defThemeClass = themeService.getThemeClass(theme);
    });
  }
  ngOnDestroy(): void {
    // this.extraStorage.setClocks(this.clocks);
    // this.extraStorage.setCurrentTheme(this.defaultTheme);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    this.extraStorage.setClocks(this.clocks);
    this.extraStorage.setCurrentTheme(this.defaultTheme);
  }

  public getThemeName(theme: Theme) {
    return Theme[theme];
  }

  public notifyThemeProvider(theme: Theme): void {
    this.themeService.notifyNewTheme(theme);
  }

  public deleteClock(id: Guid) {
    this.clocks = this.clocks.filter(clock => clock.id !== id);
    this.extraStorage.setClocks(this.clocks);
  }

  public onAddBtnClick() {
    const dialogRef: MatDialogRef<AddClockDialogComponent> = this.dialog.open(AddClockDialogComponent, {
      autoFocus: true,
      data: null,
    });
    dialogRef.afterClosed().subscribe((timeZone: string) => {
      if (timeZone) {
        this.clocks.push(new ClockData(timeZone, 250));
        this.extraStorage.setClocks(this.clocks);
      }
    });
  }
}
