import { Component } from '@angular/core';
import { ThemeService } from './providers/theme.service';
import { Theme } from './models/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public defThemeClass:String = "";
 constructor(private themeService: ThemeService) {
  // themeService.currentTheme$.subscribe((theme)=>{
  //   let defaultTheme:String = themeService.getThemeClass(theme);
  //   this.defThemeClass = defaultTheme;
  // });
 }
}
