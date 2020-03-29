import { Component } from '@angular/core';
import { TabIdBaseService } from 'src/app/providers/tab-identity.service';


@Component({
    selector: 'page-not-found',
    template: '<span class="row center-all" style="height:100vh">Page Not Found</span>'
})

export class PageNotFoundComponent {
    constructor(
        private tabId: TabIdBaseService,
    ) {
        this.tabId.apply('cross');
    }
}
