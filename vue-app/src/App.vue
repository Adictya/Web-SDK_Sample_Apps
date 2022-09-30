<template>
  <div style="height: 100vh; width: 100vw">
    <app-builder />
  </div>
</template>

<script>
import AgoraAppBuilder, { React } from "@appbuilder/web";
React.createElement("div");
AgoraAppBuilder.createCustomization({});

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
