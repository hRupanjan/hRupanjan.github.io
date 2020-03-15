import { Component, Input, OnDestroy } from '@angular/core';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
})
export class ClockComponent implements OnDestroy {
  @Input() timeZone: string;
  @Input() dim: string;

  private deg: number = 6;
  public hr_str: string;
  public mn_str: string;
  public sc_str: string;

  private hr: number = 5;
  private mn: number = 6;
  private sc: number = 4;

  private interval: any;

  constructor() {
    this.interval = setInterval(() => {
      this.updateTime();
    });
  }

  ngOnDestroy() { clearInterval(this.interval); }

  public updateTime() {
    this.timeZone = this.timeZone ? this.timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone;
    let today: Date = this.currentTimeAtTZ(this.timeZone);
    this.hr = today.getHours() * 30;
    this.mn = today.getMinutes() * this.deg;
    this.sc = today.getSeconds() * this.deg;
    this.hr_str = `rotateZ(${this.hr + this.mn / 12}deg)`;
    this.mn_str = `rotateZ(${this.mn}deg)`;
    this.sc_str = `rotateZ(${this.sc}deg)`;
  }

  public currentTimeAtTZ(tZ: string): Date {
    let today: Date = new Date();
    let date: Date = new Date(today.toLocaleString('en-US', { timeZone: tZ }));
    return date;
  }


}
