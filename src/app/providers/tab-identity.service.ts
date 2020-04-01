import { Inject, Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

export interface TabConfig {
    icons: TabIdentitiesConfig;
    cacheBusting?: boolean;
}

export interface TabIdentitiesConfig {
    [name: string]: TabIdentityConfig;
}

export interface TabIdentityConfig {
    type: string;
    href: string;
    title: string;
    isDefault?: boolean;
}

export let BROWSER_TABS_CONFIG = new InjectionToken<TabConfig>('TabIdentity.Configuration');

export abstract class TabIdBaseService {
    abstract apply(name: string): void;
    abstract reset(): void;
}

@Injectable()
export class TabIdService implements TabIdBaseService {

    private elementId: string;
    private tabIds: TabIdentitiesConfig;
    private useCacheBusting: boolean;

    constructor(@Inject(BROWSER_TABS_CONFIG) config: TabConfig) {

        this.elementId = 'iconNode';
        this.tabIds = Object.assign(Object.create(null), config.icons);
        this.useCacheBusting = (config.cacheBusting || false);

        this.removeExternalLinkElements();

    }

    public apply(name: string): void {

        if (!this.tabIds[name]) {

            throw (new Error(`Tab Id for [ ${name} ] not found.`));

        }

        this.setNode(this.tabIds[name].type, this.tabIds[name].href, this.tabIds[name].title);

    }

    public reset(): void {

        for (const name of Object.keys(this.tabIds)) {

            const tabId = this.tabIds[name];

            if (tabId.isDefault) {

                this.setNode(tabId.type, tabId.href, tabId.title);
                return;

            }

        }
        this.removeNode();
    }

    private addNode(type: string, href: string, title: string): void {

        const linkElement = document.createElement('link');
        linkElement.setAttribute('id', this.elementId);
        linkElement.setAttribute('rel', 'icon');
        linkElement.setAttribute('type', type);
        linkElement.setAttribute('href', href);
        document.head.appendChild(linkElement);

        const titleElement = document.createElement('title');
        titleElement.innerHTML = title;
        document.head.appendChild(titleElement);

    }

    private cacheBustHref(href: string): string {

        const augmentedHref = (href.indexOf('?') === -1)
            ? `${href}?faviconCacheBust=${Date.now()}`
            : `${href}&faviconCacheBust=${Date.now()}`
            ;

        return (augmentedHref);

    }

    private removeExternalLinkElements(): void {

        const linkElements = document.querySelectorAll('link[ rel ~= "icon" i]');

        for (const linkElement of Array.from(linkElements)) {

            linkElement.parentNode.removeChild(linkElement);

        }

    }

    private removeNode(): void {

        const linkElement = document.head.querySelector('#' + this.elementId);
        const titleElement = document.head.querySelector('title');

        if (linkElement) {
            document.head.removeChild(linkElement);
        }
        if (titleElement) {
            document.head.removeChild(titleElement);
        }

    }

    private setNode(type: string, href: string, title: string): void {

        const augmentedHref = this.useCacheBusting
            ? this.cacheBustHref(href)
            : href
            ;

        this.removeNode();
        this.addNode(type, augmentedHref, title);

    }

}
