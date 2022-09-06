<template>
  <div style="height: 100vh; width: 100vw">
    <app-builder />
  </div>
</template>

<script>
import AgoraAppBuilder,{React} from "agora-app-builder-sdk";
import FPE from './test-fpe'
// eslint-disable-next-line
// To prevent react getting removed in dead code elimination step;
React.createElement("div");
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
