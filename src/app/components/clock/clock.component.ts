import { Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html'
})
export class ClockComponent implements OnDestroy, OnChanges {
  @Input() timeZone: string;
  @Input() dim: number;

  private deg = 6;

  public hr: number;
  public mn: number;
  public sc: number;
  public day: string;
  public dayTimeAsset: string;

  public errMessage = '';

  private interval: any;

  constructor() {
    this.interval = setInterval(() => {
      this.updateTime();
    });
  }

  ngOnDestroy() { clearInterval(this.interval); }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.timeZone) {
      this.interval = setInterval(() => {
        this.updateTime();
      });
    }
  }

  public updateTime() {
    this.timeZone = this.timeZone ? this.timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone;
    let today: Date;
    try {
      this.errMessage = '';
      today = this.currentTimeAtTZ(this.timeZone);
    } catch (err) {
      this.errMessage = err;
      today = null;
      this.hr = this.mn = this.sc = 0;
      this.dayTimeAsset = '';
      this.stopClock();
    }
    if (today) {
      this.hr = today.getHours() * 30;
      this.mn = today.getMinutes() * this.deg;
      this.sc = today.getSeconds() * this.deg;
      this.day = this.getDayOfTheWeek(today.getDay());
      this.dayTimeAsset = today.getHours() >= 12 ? './assets/images/moon.png' : './assets/images/sun.png';
    }
  }

  public getDayOfTheWeek(dayNum: number): string {
    let day = '';
    switch (dayNum) {
      case 0:
        day = 'Sunday';
        break;
      case 1:
        day = 'Monday';
        break;
      case 2:
        day = 'Tuesday';
        break;
      case 3:
        day = 'Wednesday';
        break;
      case 4:
        day = 'Thursday';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
        break;
    }
    return day;
  }

  public stopClock(): void {
    clearInterval(this.interval);
  }

  public currentTimeAtTZ(tZ: string): Date {
    return new Date(new Date().toLocaleString('en-US', { timeZone: tZ }));
  }

  public getSizeInPx(size: number): string {
    return `${size}px`;
  }

  public getTransform(deg: number): string {
    return `rotateZ(${deg}deg)`;
  }

  public getTimeOfTheDay(): string {
    return this.hr >= 12 ? './assets/images/moon.png' : './assets/images/sun.png';
  }

}
