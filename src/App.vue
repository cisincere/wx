<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="login">
    <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import Vuerify from 'vuerify';
import Vue from 'vue';

Vue.use(Vuerify);
export default {
  data() {
    return {
      transitionName: '',
    };
  },
  created() {
    window.L2Dwidget.init({
      pluginRootPath: 'live2dw/',
      pluginJsPath: 'lib/',
      // pluginModelPath: 'live2d-widget-model-shizuku/assets/',
      pluginModelPath: 'kanna/',
      tagMode: false,
      debug: false,
      model: { jsonPath: '/live2dw/kanna/model.json' },
      display: { position: 'right', width: 150, height: 300 },
      mobile: { show: true },
      log: false,
    });
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > 0) {
        // eslint-disable-next-line no-empty
        if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right';
        } else {
          this.transitionName = 'slide-left';
        }
      } else if (to.meta.index === 0 && from.meta.index > 0) {
        this.transitionName = 'slide-right';
      }
    },
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
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .3s;
  position: absolute;
  width:100%;
  left:0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
</style>
