<template>
  <div>
    <span class="random_color_f" v-bind:style="{ color: tweenedCSSColor }">{{random_text}}</span>
    <span>111</span>
  </div>
</template>

<script>
import Color from 'color-js/color';
// eslint-disable-next-line import/extensions
import UserInfo from './UserInfo';

const TWEEN = require('@tweenjs/tween.js');

let that;
export default {
  props: ['random_text'],
  name: 'RandomTextForColor',
  data() {
    // eslint-disable-next-line no-const-assign
    that = this;
    return {
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .random_color_f {
    font-family: "BIZ UDP明朝 Medium", "Times New Roman", "Microsoft YaHei", serif;
    font-max-size: 20px;
    font-size: 17px;
  }
</style>
