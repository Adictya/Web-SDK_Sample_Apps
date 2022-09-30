import React from "react";
import { Component } from "@angular/core";
import AgoraAppBuilder from "@appbuilder/web";
import useFpe from "./useFPE";

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
    // FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------
    useFpe({
      topbar: false,
      chatTextInput: false,
      chatSendButton: false,
      chatBubble: false,
      participantsPanel: false,
      bottomBar: false,
      customContent: false,
      customLayout: false,
      i8n: false,
    });
    // FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------ FOR QA TESTING ------

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
    AgoraAppBuilder.join(
      (document.getElementById("meetingId") as HTMLInputElement)!.value
    );
  }
  ngOnDestroy() {
    this.unsubs.forEach((v) => {
      v();
    });
  }
}
