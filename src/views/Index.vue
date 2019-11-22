<template>
  <div class="index">
    <div class="index-header-m">
      <div class="nav-menu">
        <div class="blur-bg"></div>
        <div class="nav-mask"></div>
      </div>
      <div id="banner_link" class="head-banner report-wrap-module report-scroll-module"
           scrollshow="true">
      </div>
    </div>
</template>
<style>
  .index {
    font: 12px Helvetica Neue, Helvetica, Arial, Microsoft Yahei, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, sans-serif;
  }

  .index-header-m {
    width: 100%;
    position: relative;
    z-index: 10000;
    background: #fff;
    padding: 0;
    margin: 0;
  }

  .nav-menu {
    position: relative;
    width: 100%;
    z-index: 200;
    height: 42px;
    color: #222;
  }

  .nav-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 100%, .4);
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
  }

  .blur-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center -10px;
    background-repeat: no-repeat;
    filter: blur(4px);
  }
</style>
