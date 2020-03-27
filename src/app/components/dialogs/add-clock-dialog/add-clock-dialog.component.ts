import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ThemeService } from 'src/app/providers/theme.service';
import { Theme } from 'src/app/models/enums';
import * as moment from 'moment-timezone';

@Component({
    selector: 'add-clock-dialog',
    templateUrl: './add-clock-dialog.component.html'
})
export class AddClockDialogComponent {
    public defThemeClass = '';
    public selectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    public timeZones: string[] = moment.tz.names();
    constructor(
        public themeService: ThemeService,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<AddClockDialogComponent>
    ) {
        // const clockData: AddClockData = JSON.parse(data);
        themeService.currentTheme$.subscribe((theme: Theme) => {
            this.defThemeClass = themeService.getThemeClass(theme);
        });
    }

    public closeModal() {
        this.dialogRef.close();
    }
}

