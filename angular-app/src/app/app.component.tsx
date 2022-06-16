import React from 'react';
import { Component } from '@angular/core';
import AgoraAppBuilder from 'agora-app-builder-sdk';

// Prevent dead code elimination on react
React.createElement('div');

@Component({
  selector: 'app-root',
  template: `
    <div >
      <div>
        Join a meeting:
        <input id="meetingId" placeholder="meetingId"/>
        <button
          (click)="JoinMeeting()"
        >
          Join
        </button>
      </div>
      <div style="height: 100vh">
        <app-builder></ app-builder>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-app';

  ngOnInit() {
    const fpe = AgoraAppBuilder.createFPE({
        components:{
            create: () => <div>Hi</div>
          }
      });
    AgoraAppBuilder.addFPE(fpe);

    AgoraAppBuilder.on(
      'create',
      (hostMeetingId, attendeeMeetingId, pstnNumber) => {
        console.log('Meeting created with', {
          hostMeetingId,
          attendeeMeetingId,
          pstnNumber,
        });
      }
    );
    AgoraAppBuilder.on('preJoin', (meetingTitle, deviceList) => {
      console.log('in meeting precall with', { meetingTitle, deviceList });
    });
    AgoraAppBuilder.on('join', (meetingTitle, deviceList, isHost) => {
      console.log('Meeting joined with', { meetingTitle, deviceList, isHost });
    });
    AgoraAppBuilder.on('leave', () => {
      console.log('Meeting left');
    });
  }

  JoinMeeting() {
    AgoraAppBuilder.joinMeeting(
      document.getElementById('meetingId')!.nodeValue!
    );
  }
  ngOnDestroy(){
    AgoraAppBuilder.off("create");
    AgoraAppBuilder.off("preJoin");
    AgoraAppBuilder.off("join");
    AgoraAppBuilder.off("leave");
  }
}
