import { Injectable } from '@angular/core';
import { Theme } from 'src/app/models/enums';
import { ClockData } from 'src/app/models/clock-data';

@Injectable({
    providedIn: 'root',
})
export class ExtrasStorageService {
    setCurrentTheme(theme: Theme) {
        const lS: Storage = this.getStorage();
        if (lS) {
            lS.setItem('currentTheme', JSON.stringify(theme));
        }
    }
    getCurrentTheme(): Theme {
        const lS: Storage = this.getStorage();
        if (lS) {
            const temp = lS.getItem('currentTheme');
            if (temp) {
                return JSON.parse(temp);
            } else {
                return Theme.Dark;
            }
        }
        return Theme.Dark;
    }

    setClocks(clocks: Array<ClockData>) {
        const lS: Storage = this.getStorage();
        if (lS) {
            lS.setItem('clocksData', JSON.stringify(clocks));
        }
    }
    getClocks(): Array<ClockData> {
        const lS: Storage = this.getStorage();
        if (lS) {
            const temp = lS.getItem('clocksData');
            if (temp) {
                return JSON.parse(temp);
            } else {
                return new Array<ClockData>();
            }
        }
        return new Array<ClockData>();
    }

    private getStorage(): Storage {
        return window.localStorage;
    }
}
