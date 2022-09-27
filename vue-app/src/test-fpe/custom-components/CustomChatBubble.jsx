// @ts-nocheck
import {
  ChatBubble,
  useEditMessage,
  useDeleteMessage,
  MESSAGE_TYPE,
  useChatUIControl,
  useLocalUid,
  React,
  RN,
} from "@appbuilder/web";
const { Text, TextInput, TouchableOpacity, View } = RN;
const { useState } = React;

export const CustomCmp = (props) => {
  const [editActive, setEditActive] = useState(false);
  const editmsg = useEditMessage();
  const delmsg = useDeleteMessage();
  const localUid = useLocalUid();
  const { privateActive, selectedChatUserId } = useChatUIControl();
  const [editMsgLocal, setEditMsgLocal] = useState("");
  if (editActive) {
    return (
      <React.Fragment>
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
      </React.Fragment>
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
            <React.Fragment>
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
            </React.Fragment>
          )}
        </View>
      )}
    </View>
  );
};
