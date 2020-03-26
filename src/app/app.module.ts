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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorldClockComponent,
    ClockComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
