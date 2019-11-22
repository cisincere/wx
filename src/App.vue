<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created() {
    window.L2Dwidget.init({
      pluginRootPath: 'live2dw/',
      pluginJsPath: 'lib/',
      // pluginModelPath: 'live2d-widget-model-shizuku/assets/',
      pluginModelPath: ' Terisa_live2D-master/Terisa_live2D-master/',
      tagMode: false,
      debug: false,
      model: { jsonPath: '/live2dw/Terisa_live2D-master/Terisa_live2D-master/model.json' },
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
