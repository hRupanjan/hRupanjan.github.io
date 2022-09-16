import { Component, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { ClockData } from 'src/app/models/clock-data';
import { ThemeService } from 'src/app/providers/theme.service';
import { Theme } from 'src/app/models/enums';
import { AddClockDialogComponent } from '../dialogs/add-clock-dialog/add-clock-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Guid } from 'guid-typescript';
import { TabIdBaseService } from 'src/app/providers/tab-identity.service';
import { ExtrasStorageService } from 'src/app/providers/storage/extras-storage.service';

@Component({
  selector: 'rasa-chat',
  templateUrl: './rasa-chat.component.html'
})
export class RasaChatComponent implements OnDestroy, AfterViewInit {

  constructor(
    public themeService: ThemeService,
    private tabId: TabIdBaseService
  ) {
    this.tabId.apply('rasaChat');
  }
  ngAfterViewInit(): void {
    (function () {
      let e = document.createElement("script"),
        t = document.head || document.getElementsByTagName("head")[0];
      (e.src =
        "https://cdn.jsdelivr.net/npm/rasa-webchat/lib/index.js"),
        (e.async = !0),
        (e.onload = () => {
          // @ts-ignore
          window?.WebChat?.default(
            {
              customData: { language: "en" },
              socketUrl: "https://rasa-server-chatlead-rupanjanhari.cloud.okteto.net/",
              title: 'Rasa Bot',
              subtitle: 'Say hi and get started!',
              // profileAvatar: "./assets/svg/robot.svg",
              // openLauncherImage: "./assets/svg/comment.svg",
              // closeImage: "./assets/svg/down.svg",
              showMessageDate: true,
              inputTextFieldHint: "What's in your mind?...",
              // embedded: true,
              customMessageDelay: (message) => {
                let delay = message.length * 40;
                if (delay > 3 * 1000) delay = 3 * 1000;
                if (delay < 800) delay = 800;
                return delay;
              }


              // add other props here
            },
            null
          );
        }),
        t.insertBefore(e, t.firstChild);
    })();
  }
  ngOnDestroy(): void {
    const scriptElem = document.querySelector("script[src='https://cdn.jsdelivr.net/npm/rasa-webchat/lib/index.js']");
    scriptElem.remove();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {

  }

}
