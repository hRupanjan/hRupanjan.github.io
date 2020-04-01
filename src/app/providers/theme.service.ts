import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Theme } from '../models/enums';
import { ExtrasStorageService } from './storage/extras-storage.service';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    preSavedTheme: Theme;
    constructor(private extraStorage: ExtrasStorageService) {
        this.preSavedTheme = this.extraStorage.getCurrentTheme();
        this.onCurrentThemeChange = new BehaviorSubject<Theme>(this.preSavedTheme);
        this.currentTheme$ = this.onCurrentThemeChange.asObservable();
    }
    private onCurrentThemeChange: BehaviorSubject<Theme>; // = new BehaviorSubject<Theme>(this.preSavedTheme);
    public currentTheme$: Observable<Theme>; // = this.onCurrentThemeChange.asObservable();

    public availableThemes: Array<Theme> = [Theme.Light, Theme.Dark, Theme.SeaFoam, Theme.Peach];

    public getThemeClass(theme: Theme): string {
        let defaultTheme = 'dark-theme';

        switch (Theme[theme]) {
            case Theme[Theme.Light]:
                defaultTheme = 'light-theme';
                break;
            case Theme[Theme.Dark]:
                defaultTheme = 'dark-theme';
                break;
            case Theme[Theme.Peach]:
                defaultTheme = 'peach-theme';
                break;
            case Theme[Theme.SeaFoam]:
                defaultTheme = 'seafoam-theme';
                break;
            default:
                defaultTheme = 'dark-theme';
                break;
        }

        return defaultTheme;
    }

    public notifyNewTheme(theme: Theme): void {
        this.onCurrentThemeChange.next(theme);
    }
}
