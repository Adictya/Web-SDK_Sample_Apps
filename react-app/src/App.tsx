import React, { useEffect } from "react";
import fpe from "./test-fpe";
import AppBuilderMethods from "agora-app-builder-sdk";

function App() {
  useEffect(() => {
    const unsubs: Array<any> = [
      AppBuilderMethods.on(
        "create",
        (hostMeetingId, attendeeMeetingId, pstnNumber) => {
          console.log("React Host App: Meeting created with", {
            hostMeetingId,
            attendeeMeetingId,
            pstnNumber,
          });
        }
      ),
      AppBuilderMethods.on("create", () => {
        console.log("React Host App: Meeting created queued event");
      }),
      AppBuilderMethods.on("preJoin", (meetingTitle, deviceList) => {
        console.log("React Host App: precall with", {
          meetingTitle,
          deviceList,
        });
      }),
      AppBuilderMethods.on("join", (meetingTitle, deviceList, isHost) => {
        console.log("React Host App: joined with", {
          meetingTitle,
          deviceList,
          isHost,
        });
      }),
      AppBuilderMethods.on("leave", () => {
        console.log("React Host App: left");
      }),
    ];
    return () => {
      unsubs.forEach((v) => {
        if (typeof v === "function") v();
      });
    };
  }, []);

  const joinMeeting = () => {
    AppBuilderMethods.joinMeeting(
      document.getElementById("meetingId")!.nodeValue!
    );
  };

  return (
    <div>
      <div style={{ height: "1.5rem" }}>
        Join a meeting:
        <input id="meetingId" placeholder="meetingId" />
        <button onClick={joinMeeting}>Join</button>
      </div>
      <div
        style={{
          display: "flex",
          height: "calc( 100vh - 1.5rem )",
          width: "100vw",
        }}
      >
        <AppBuilderMethods.View />
      </div>
    </div>
  );
}

export default App;
