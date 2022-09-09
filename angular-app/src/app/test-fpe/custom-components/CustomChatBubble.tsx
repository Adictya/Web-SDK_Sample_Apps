// @ts-nocheck
import {
  ChatBubbleProps,
  ChatBubble,
  useEditMessage,
  useDeleteMessage,
  MESSAGE_TYPE,
  useChatUIControl,
  useLocalUid,
  React,
  RN,
} from "agora-app-builder-sdk";
const { Button, Text, TextInput, Touchable, TouchableOpacity, View } = RN;
const { useState } = React;

const CustomCmp = (props: ChatBubbleProps) => {
  const [editActive, setEditActive] = useState(false);
  const editmsg = useEditMessage();
  const delmsg = useDeleteMessage();
  const localUid = useLocalUid();
  const { privateActive, selectedChatUserId } = useChatUIControl();
  const [editMsgLocal, setEditMsgLocal] = useState("");
  if (editActive) {
    return (
      <>
        <TextInput
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            width: "90%",
            height: 35,
            borderRadius: 20,
            borderWidth: 2,
            paddingHorizontal: 10,
            borderColor: "black",
          }}
          placeholder={"Edit message"}
          // @ts-ignore
          // eslint-disable-next-line
          onChangeText={(txt) => setEditMsgLocal(txt)}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={() => {
              //do edit
              editmsg(
                privateActive ? MESSAGE_TYPE.private : MESSAGE_TYPE.group,
                props.msgId,
                editMsgLocal,
                privateActive ? selectedChatUserId : undefined
              );
              setEditActive(false);
            }}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              setEditActive(false);
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
  return (
    <View>
      <ChatBubble
        {...props}
        message={props.isDeleted ? "This message was deleted" : props.message}
      />
      {props.uid === localUid && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {!props?.isDeleted && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setEditActive(true);
                }}
              >
                <Text>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginHorizontal: 10 }}
                onPress={() => {
                  delmsg(
                    privateActive ? MESSAGE_TYPE.private : MESSAGE_TYPE.group,
                    props.msgId,
                    privateActive ? selectedChatUserId : undefined
                  );
                }}
              >
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomCmp;
