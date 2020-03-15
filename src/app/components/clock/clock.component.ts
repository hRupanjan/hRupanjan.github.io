import { Component, Input, OnDestroy } from '@angular/core';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html',
})
export class ClockComponent implements OnDestroy {
  @Input() timeZone: string;
  @Input() dim: string;

  private deg = 6;
  public hrStr: string;
  public mnStr: string;
  public scStr: string;

  private hr: number;
  private mn: number;
  private sc: number;

  private interval: any;

  constructor() {
    this.interval = setInterval(() => {
      this.updateTime();
    });
  }

  ngOnDestroy() { clearInterval(this.interval); }

  public updateTime() {
    this.timeZone = this.timeZone ? this.timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today: Date = this.currentTimeAtTZ(this.timeZone);
    this.hr = today.getHours() * 30;
    this.mn = today.getMinutes() * this.deg;
    this.sc = today.getSeconds() * this.deg;
    this.hrStr = `rotateZ(${this.hr + this.mn / 12}deg)`;
    this.mnStr = `rotateZ(${this.mn}deg)`;
    this.scStr = `rotateZ(${this.sc}deg)`;
  }

  public currentTimeAtTZ(tZ: string): Date {
    return new Date(new Date().toLocaleString('en-US', { timeZone: tZ }));
  }


}
