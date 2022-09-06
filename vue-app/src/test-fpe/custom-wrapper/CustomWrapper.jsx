/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
// @ts-ignore
import { createHook, React } from "agora-app-builder-sdk";

const CustomWrapperContext = React.createContext({
  customKey1: "hi",
  customKey2: "hello",
});

const CustomWrapperProvider = (props) => {
  const [customState, setCustomState] = React.useState();

  React.useEffect(() => {
    setCustomState({
      customKey1: "hi from State",
      customKey2: "hello from state",
    });
  }, []);
  return (
    <CustomWrapperContext.Provider value={{ ...customState }}>
      {props.children}
    </CustomWrapperContext.Provider>
  );
};

const useCustomWrapper = createHook(CustomWrapperContext);

export { CustomWrapperProvider, useCustomWrapper };
