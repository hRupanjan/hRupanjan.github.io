import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WorldClockComponent } from './components/world-clock-container/world-clock-container.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClockComponent } from './components/clock/clock.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeService } from './providers/theme.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddClockDialogComponent } from './components/dialogs/add-clock-dialog/add-clock-dialog.component';
import { MatDialogModule } from '@angular/material';
import { TabIdBaseService, TabIdService, BROWSER_TABS_CONFIG } from './providers/tab-identity.service';
import { ExtrasStroageService } from './providers/storage/extras-storage.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorldClockComponent,
    ClockComponent,
    AddClockDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AddClockDialogComponent
  ],
  providers: [
    ThemeService,
    ExtrasStroageService,
    {
      provide: TabIdBaseService,
      useClass: TabIdService
    },
    {
      provide: BROWSER_TABS_CONFIG,
      useValue: {
        icons: {
          portfolio: {
            type: 'image/x-icon',
            href: 'favicon.ico',
            title: 'Portfolio',
            isDefault: true
          },
          world: {
            type: 'image/x-icon',
            href: './assets/images/world.ico',
            title: 'World Clock',
          },
          cross: {
            type: 'image/x-icon',
            href: './assets/images/cross.ico',
            title: 'Page Not Found',
          }
        },

        cacheBusting: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
