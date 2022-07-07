import React, { useEffect, useState } from "react";
import AppBuilderMethods from "agora-app-builder-sdk";

function App() {
  useEffect(() => {
    AppBuilderMethods.on("join", (tet,_,isHost) => {
      console.log("I got join",tet,isHost);
    });
    AppBuilderMethods.on("preJoin", (title) => {
      console.log("I got preJoin",title);
    });
    AppBuilderMethods.addFPE({
      components: {
        // create: Precall,
        // videoCall: Precall,
      },
    });
  }, []);
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <AppBuilderMethods.View />
    </div>
  );
}

export default App;
