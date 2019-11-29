<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import Vuerify from 'vuerify';
import Vue from 'vue';

Vue.use(Vuerify);
export default {
  created() {
    window.L2Dwidget.init({
      pluginRootPath: 'live2dw/',
      pluginJsPath: 'lib/',
      // pluginModelPath: 'live2d-widget-model-shizuku/assets/',
      pluginModelPath: 'kanna/',
      tagMode: false,
      debug: false,
      model: { jsonPath: '/live2dw/kanna/model.json' },
      display: { position: 'right', width: 200, height: 400 },
      mobile: { show: true },
      log: false,
    });
  },
};
</script>

<style lang="scss">
html,body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
