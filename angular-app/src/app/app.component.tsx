import React from "react";
import { Component } from "@angular/core";
import AgoraAppBuilder from "@appbuilder/web";
import fpe from "./test-fpe";

// Prevent dead code elimination on react
React.createElement("div");

@Component({
  selector: "app-root",
  template: `
    <div>
      <div style="height: 1.5rem">
        Join a meeting:
        <input id="meetingId" placeholder="meetingId" />
        <button (click)="JoinMeeting()">Join</button>
      </div>
      <div style="height: calc(100vh - 1.5rem)">
        <app-builder></app-builder>
      </div>
    </div>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "angular-app";
  unsubs: Array<any> = [];
  ngOnInit() {
    // AgoraAppBuilder.customize(fpe);
    this.unsubs = [
      AgoraAppBuilder.on(
        "create",
        (hostMeetingId, attendeeMeetingId, pstnNumber) => {
          console.log("Angular Host App: Meeting created with", {
            hostMeetingId,
            attendeeMeetingId,
            pstnNumber,
          });
        }
      ),
      AgoraAppBuilder.on("create", () => {
        console.log("Angular Host App: Meeting created queued event");
      }),
      AgoraAppBuilder.on("ready-to-join", (meetingTitle, deviceList) => {
        console.log("Angular Host App: precall with", {
          meetingTitle,
          deviceList,
        });
      }),
      AgoraAppBuilder.on("join", (meetingTitle, deviceList, isHost) => {
        console.log("Angular Host App: joined with", {
          meetingTitle,
          deviceList,
          isHost,
        });
      }),
      AgoraAppBuilder.on("leave", () => {
        console.log("Angular Host App: left");
      }),
    ];
  }

  JoinMeeting() {
    // AgoraAppBuilder.joinMeeting(
    //   document.getElementById("meetingId")!.nodeValue!
    // );
  }
  ngOnDestroy() {
    this.unsubs.forEach((v) => {
      v();
    });
  }
}
