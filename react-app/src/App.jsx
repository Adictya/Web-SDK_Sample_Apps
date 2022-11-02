import React, { useEffect, useState } from "react";
import Checkbox from "./CheckBox";
import AppBuilderMethods from "@appbuilder/react";
import useFPE from "./useFPE";

let unsubs;

function App() {
  const [topbar, setTopbar] = useState(false);
  const [chatTextInput, setChatTextInput] = useState(false);
  const [chatSendButton, setChatSendButton] = useState(false);
  const [chatBubble, setChatBubble] = useState(false);
  const [participantsPanel, setParticipantsPanel] = useState(false);
  const [bottomBar, setBottomBar] = useState(false);
  const [customContent, setCustomContent] = useState(false);
  const [customLayout, setCustomLayout] = useState(false);
  const [i8n, setI8n] = useState(false);

  useFPE({
    topbar,
    chatTextInput,
    chatSendButton,
    chatBubble,
    participantsPanel,
    bottomBar,
    customContent,
    customLayout,
    i8n,
  });

  useEffect(() => {
    unsubs = [
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
      AppBuilderMethods.on("ready-to-join", (meetingTitle, deviceList) => {
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
    AppBuilderMethods.join(document.getElementById("meetingId").value);
  };

  const unsubscribe = () => {
    unsubs.forEach((v) => {
      if (typeof v === "function") v();
    });
  };

  return (
    <div>
      <div
        style={{ display: "flex", overflowX: "scroll", alignItems: "center" }}
      >
        <div style={{ display: "flex", height: "3rem" }}>
          <input id="meetingId" placeholder="meetingId" />
          <button onClick={joinMeeting}>Join</button>
          <button onClick={unsubscribe}>Unsubscribe</button>
        </div>
        <div>Overrides:</div>
        <Checkbox state={{ topbar }} setter={setTopbar} />
        <Checkbox state={{ chatTextInput }} setter={setChatTextInput} />
        <Checkbox state={{ chatSendButton }} setter={setChatSendButton} />
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
        <AppBuilderMethods.View />
      </div>
    </div>
  );
}

export default App;
