<template>
<div>
  <div v-for="(item, index) in index_main_menu" :key="index" class="random_text"
       @click="changeColor(index)" :id="index">
    <router-link :to="item.value">
      <div class="menu-text">
        <span class="random_color_f" v-bind:style="{ color: tweenedCSSColor }">{{item.key}}</span>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
import Color from 'color-js/color';
import $ from 'jquery';
// eslint-disable-next-line import/extensions
import UserInfo from './UserInfo';

const TWEEN = require('@tweenjs/tween.js');

let that;
export default {
  name: 'RandomTextForColor',
  data() {
    // eslint-disable-next-line no-const-assign
    that = this;
    return {
      index_main_menu: [],
      colorQuery: '#f4eeeb',
      color: {
        alpha: 1,
        blue: 0.5152140392405986,
        green: 0.3193669804066018,
        red: 0.7903971764295563,
      },
      tweenedColor: {},
    };
  },
  created() {
    this.tweenedColor = Object.assign({}, this.color);
    this.index_main_menu = this.$store.getters.getIndexMainMenu;
  },
  watch: {
    color() {
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween(this.tweenedColor)
        .to(this.color, 900)
        .start();

      animate();
    },
  },
  computed: {
    tweenedCSSColor() {
      return new Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.tweenedColor.alpha,
      }).toCSS();
    },
  },
  mounted() {
    setInterval(() => {
      let p;
      let color = '#';
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 6; i++) {
        // eslint-disable-next-line radix
        p = UserInfo.colors[parseInt(String(Math.random() * UserInfo.colors.length))];
        color += p;
      }
      if (typeof (that.colorQuery) !== 'undefined') {
        that.colorQuery = color;
        that.updateColor();
      }
    }, 1300);
  },
  methods: {
    updateColor() {
      this.color = new Color(this.colorQuery).toRGB();
      this.colorQuery = '';
    },
    empty() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.index_main_menu.length; i++) {
        const search = `div#${i} div`;
        $(search).css('border-bottom', '1px solid rgba(0, 0, 0, 0.11)');
      }
    },
    changeColor(index) {
      this.empty();
      const search = `div#${index} div`;
      $(search).css('border-bottom', '2px solid #4590FF');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .random_color_f {
    font-family: "BIZ UDP明朝 Medium", "Times New Roman", "Microsoft YaHei", serif;
    font-max-size: 20px;
    font-size: 14px;
  }
  .menu-text{
    width: 56px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.11);
  }
  .random_text{
    display: inline-block;
    margin-left: 80px;
  }
</style>
