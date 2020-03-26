import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Theme } from '../models/enums';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private onCurrentThemeChange: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.SeaFoam);
    public currentTheme$: Observable<Theme> = this.onCurrentThemeChange.asObservable();

    public availableThemes: Array<Theme> = [Theme.Light, Theme.Dark, Theme.SeaFoam];

    public getThemeClass(theme: Theme): String {
        let defaultTheme: String = "dark-theme";

        switch (Theme[theme]) {
            case Theme[Theme.Light]:
                defaultTheme = "light-theme";
                break;
            case Theme[Theme.Dark]:
                defaultTheme = "dark-theme";
                break;
            case Theme[Theme.Peach]:
                defaultTheme = "peach-theme";
                break;
            case Theme[Theme.SeaFoam]:
                defaultTheme = "seafoam-theme";
                break;
            default:
                defaultTheme = "dark-theme";
                break;
        }

        return defaultTheme;
    }

    public notifyNewTheme(theme: Theme): void {
        this.onCurrentThemeChange.next(theme);
    }
}