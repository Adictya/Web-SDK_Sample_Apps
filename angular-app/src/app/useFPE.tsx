import AppBuilderMethods, { React } from "@appbuilder/web";

const HelloWorldComponent = (props: any) => {
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

const customLayoutsOverride = (defaultLayouts: any) => {
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

const toggler = (setter: any, value: any) => {
  return setter ? value : null;
};

interface useFPEInterface {
  topbar: boolean;
  chatTextInput: boolean;
  chatSendButton: boolean;
  chatBubble: boolean;
  participantsPanel: boolean;
  bottomBar: boolean;
  customContent: boolean;
  customLayout: boolean;
  i8n: boolean;
}

const useFPE = (props: useFPEInterface) => {
  const {
    topbar,
    chatTextInput,
    chatSendButton,
    chatBubble,
    participantsPanel,
    bottomBar,
    customContent,
    customLayout,
    i8n,
  } = props;

  console.log("I WAS CALLED");

  AppBuilderMethods.customize({
    components: {
      videoCall: {
        topBar: toggler(topbar, HelloWorldComponent),
        chat: {
          chatBubble: toggler(chatBubble, HelloWorldComponent),
          chatInput: toggler(chatTextInput, HelloWorldComponent),
          chatSendButton: toggler(chatSendButton, HelloWorldComponent),
        },
        participantsPanel: toggler(participantsPanel, HelloWorldComponent),
        bottomBar: toggler(bottomBar, HelloWorldComponent),
        customContent: toggler(customContent, customContentOverride),
        customLayout: toggler(customLayout, customLayoutsOverride),
      },
    },
    i18n: toggler(i8n, i8nOverride),
  });
};

export default useFPE;
