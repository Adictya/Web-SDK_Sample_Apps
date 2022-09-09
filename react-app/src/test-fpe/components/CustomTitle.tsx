// @ts-nocheck
import {CustomEvents} from 'agora-app-builder-sdk';
import React from 'react';
import {View, Button} from 'react-native-web';

export default function CustomTitle() {
  React.useEffect(() => {
    CustomEvents.on('test1', (data) => {
      console.log('CUSTOM_EVENT_API:FPE_EVENT callback test1: ', data);
    });
    CustomEvents.on('test2', (data) => {
      console.log('CUSTOM_EVENT_API:FPE_EVENT callback test1: ', data);
    });
    CustomEvents.on('test3', (data) => {
      console.log('CUSTOM_EVENT_API:FPE_EVENT callback test1: ', data);
    });
    CustomEvents.on('test4', (data) => {
      console.log('CUSTOM_EVENT_API:FPE_EVENT callback test1: ', data);
    });
  }, []);

  const sendLevel1Message = () => {
    CustomEvents.send('test1', {
      value: 'level 1 value',
    });
  };
  const sendLevel2Message = () => {
    CustomEvents.send('test2', {
      value: 'level 2 value:',
      level: 2,
    });
  };
  const sendLevel3Message = () => {
    CustomEvents.send('test3', {
      value: 'level 3 value:',
      level: 3,
    });
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        flex: 1,
        backgroundColor: 'red',
      }}>
      <Button onPress={sendLevel1Message} title="Send Level 1 message" />
      <Button onPress={sendLevel2Message} title="Send Level 2 message" />
      <Button onPress={sendLevel3Message} title="Send Level 3 message" />
      {/* <Button onPress={fpeEvents.printEvents} title="Print events" /> */}
    </View>
  );
}
