import { Component } from '@angular/core';
import { TabIdBaseService } from 'src/app/providers/tab-identity.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private tabId: TabIdBaseService,
  ) {
    this.tabId.reset();
  }
}
