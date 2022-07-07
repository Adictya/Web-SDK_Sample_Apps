<template>
  <div style="height: 100vh; width: 100vw">
    <app-builder />
  </div>
</template>

<script>
import AgoraAppBuilder from "agora-app-builder-sdk";
// eslint-disable-next-line
import React from "react";
// To prevent react getting removed in dead code elimination step;
React.createElement("div");

// const Create = () => {
//   return <div>Create screen</div>;
// };

const FPE = AgoraAppBuilder.createFPE({
  //  components: {
  //    create: Create,
  //  },
});

AgoraAppBuilder.addFPE(FPE);

export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
