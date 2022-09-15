import { useEffect } from "react";
import AppBuilderMethods from "agora-app-builder-sdk";

const HelloWorldComponent = (props:any) => {
  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "purple",
        color: "white",
        wordBreak: "break-word",
      }}
    >
      Component Overriden, Props Recieved {JSON.stringify(props)}
    </div>
  );
};

const i8nOverride = [
  {
    locale: "en-us",
    label: "English",
    data: {
      joinRoomButton: "Join Room edited",
      meetingNameInputPlaceholder: "Room name edited",
      pstnUserLabel: "PSTN USER",
    },
  },
];

const customContentOverride = {
  rtc: HelloWorldComponent,
};

const customLayoutsOverride = (defaultLayouts:any) => {
  return [
    ...defaultLayouts,
    {
      component: HelloWorldComponent,
      label: "Top Pinned Layout",
      name: "TopPinnedLayout",
      iconName: "clipboard",
    },
  ];
};

const toggler = (setter: boolean, value: any) => {
  return setter ? value : null;
};

const useFPE = (props: { [key: string]: boolean }) => {
  const {
    topbar,
    chatBubble,
    participantsPanel,
    bottomBar,
    customContent,
    customLayout,
    i8n,
  } = props;

  useEffect(() => {
    AppBuilderMethods.addFPE({
      components: {
        videoCall: {
          topBar: toggler(topbar, HelloWorldComponent),
          chat: {
            chatBubble: toggler(chatBubble, HelloWorldComponent),
          },
          participantsPanel: toggler(participantsPanel, HelloWorldComponent),
          bottomBar: toggler(bottomBar, HelloWorldComponent),
          customContent: toggler(customContent, customContentOverride),
          customLayout: toggler(customLayout, customLayoutsOverride),
        },
      },
      i18n: toggler(i8n, i8nOverride),
    });
  }, [
    topbar,
    chatBubble,
    participantsPanel,
    bottomBar,
    customContent,
    customLayout,
    i8n,
  ]);
};

export default useFPE;
