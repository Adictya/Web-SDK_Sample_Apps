import React, { useEffect, useState } from "react";
import Checkbox from "./CheckBox";
import AppBuilderMethods from "agora-app-builder-sdk";
import useFPE from "./useFPE";

function App() {
  const [topbar, setTopbar] = useState(false);
  const [chatBubble, setChatBubble] = useState(false);
  const [participantsPanel, setParticipantsPanel] = useState(false);
  const [bottomBar, setBottomBar] = useState(false);
  const [customContent, setCustomContent] = useState(false);
  const [customLayout, setCustomLayout] = useState(false);
  const [i8n, setI8n] = useState(false);
  const {View} = AppBuilderMethods

  useFPE({
    topbar,
    chatBubble,
    participantsPanel,
    bottomBar,
    customContent,
    customLayout,
    i8n,
  });

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
      <div
        style={{ display: "flex", overflowX: "scroll", alignItems: "center" }}
      >
        <div style={{ display: "flex", height: "3rem" }}>
          <input id="meetingId" placeholder="meetingId" />
          <button onClick={joinMeeting}>Join</button>
        </div>
        <Checkbox state={{ topbar }} setter={setTopbar} />
        <Checkbox state={{ chatBubble }} setter={setChatBubble} />
        <Checkbox state={{ participantsPanel }} setter={setParticipantsPanel} />
        <Checkbox state={{ bottomBar }} setter={setBottomBar} />
        <Checkbox state={{ customContent }} setter={setCustomContent} />
        <Checkbox state={{ customLayout }} setter={setCustomLayout} />
        <Checkbox state={{ i8n }} setter={setI8n} />
      </div>
      <div
        style={{
          display: "flex",
          height: "calc( 100vh - 3rem )",
          width: "100vw",
        }}
      >
        <View />
      </div>
    </div>
  );
}

export default App;
