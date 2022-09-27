// @ts-nocheck
import {
  ParticipantsView,
  useSetName,
  isWeb,
  config,
  RN,
  React,
} from "@appbuilder/web";
const { View, TextInput, Button, Dimensions } = RN;
const { useState } = React;
const CustomParticipantPanel = () => {
  const [name, setName] = useState("");
  const _useSetName = useSetName();

  const [dim] = useState([
    Dimensions.get("window").width,
    Dimensions.get("window").height,
    Dimensions.get("window").width > Dimensions.get("window").height,
  ]);
  const isSmall = dim[0] < 700;

  const renderChangeName = () => {
    return (
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          backgroundColor: config.SECONDARY_FONT_COLOR,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{ borderWidth: 1, borderColor: "black", minHeight: 50 }}
          placeholder={"Enter new name"}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <View style={{ paddingVertical: 5 }}>
          <Button
            title="change name"
            onPress={() => {
              _useSetName(name);
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View
      style={
        isWeb
          ? isSmall
            ? {
                position: "absolute",
                zIndex: 5,
                width: "100%",
                height: "100%",
                right: 0,
                top: 0,
              }
            : {
                width: "20%",
                minWidth: 200,
                maxWidth: 300,
                flex: 1,
                backgroundColor: config.SECONDARY_FONT_COLOR,
                shadowColor: config.PRIMARY_FONT_COLOR + "80",
                shadowOpacity: 0.5,
                shadowOffset: { width: -2, height: 0 },
                shadowRadius: 3,
              }
          : {
              position: "absolute",
              zIndex: 5,
              width: "100%",
              height: "100%",
              right: 0,
              top: 0,
            }
      }
    >
      {renderChangeName()}
      <View style={{ flex: 2 }}>
        <ParticipantsView />
      </View>
    </View>
  );
};
export { CustomParticipantPanel };
