<template>
  <div class="flex-container" id="login" :style="{height: screenHeight+'px'}">
    <div class="canvaszz" :style="{height: screenHeight+'px'}"></div>
    <canvas id="canvas" :style="{height: screenHeight+'px'}"></canvas>
  </div>
</template>

<script>
// import mapState from 'vuex'
export default {
  data() {
    return {
      screenHeight: window.innerHeight, // 屏幕高度
    };
  },
  watch: {
    screenHeight(val) { // 监听屏幕高度变化
      const oIframe = document.getElementById('login');
      oIframe.style.height = `${Number(val)}px`; // '120'是页面布局调整，可去除
    },
  },
  mounted() {
    // eslint-disable-next-line no-underscore-dangle
    const _this = this;
    window.onresize = function () { // 定义窗口大小变更通知事件
      _this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    // eslint-disable-next-line no-multi-assign
    const w = canvas.width = window.innerWidth;
    // eslint-disable-next-line no-multi-assign
    const h = canvas.height = window.innerHeight;
    const hue = 217;
    const stars = [];
    let count = 0;
    const maxStars = 1300; // 星星数量

    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    const half = canvas2.width / 2;
    const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
    gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
      if (arguments.length < 2) {
        // eslint-disable-next-line no-param-reassign
        max = min;
        // eslint-disable-next-line no-param-reassign
        min = 0;
      }

      if (min > max) {
        const hold = max;
        // eslint-disable-next-line no-param-reassign
        max = min;
        // eslint-disable-next-line no-param-reassign
        min = hold;
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
      const max = Math.max(x, y);
      const diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
      // 星星移动范围，值越大范围越小，
    }

    const Star = function () {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 8;
      // 星星大小
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000;
      // 星星移动速度
      this.alpha = random(2, 10) / 10;

      // eslint-disable-next-line no-plusplus
      count++;
      stars[count] = this;
    };

    Star.prototype.draw = function () {
      const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
      const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
      const twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    };

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < maxStars; i++) {
      /* eslint-disable no-new */
      new Star();
    }

    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.5; // 尾巴
      ctx.fillStyle = `hsla(${hue}, 64%, 6%, 2)`;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      // eslint-disable-next-line no-plusplus
      for (let i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }

      window.requestAnimationFrame(animation);
    }

    animation();
  },
  created() {
    this.$http.get('/api/users').then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    addClass(val) {
      document.getElementById(val).style.color = 'black';
      // document.getElementById('register').style.color = 'black'
    },
    deleteClass(val) {
      document.getElementById(val).style.color = '';
    },
  },
};
</script>

<style lang="scss" scoped>

  body {margin:0 auto;overflow:hidden;}

  /*=============ç¬¬ä¸€é¡µ=============*/
  .header{
    margin:0 auto;
    width:100%;
    height:640px;
    background-color:#000;
    position:relative;
  }
  .header canvas {
    width:100%;height:auto;
    display:inline-block;vertical-align:baseline;
    position:absolute;
    z-index:-1;
  }
  .header .canvaszz{
    width:100%;
    background-image: url(../static/in_top_bj.jpg);
    height:640px;
    position:absolute;
    z-index:10;
    filter:alpha(opacity=40);
    -moz-opacity:0.4;
    -khtml-opacity: 0.4;
    opacity: 0.4;
  }

  .audio{
    width:45px;
    position:fixed;top:65px;left:94%;
    z-index:100;
    filter:alpha(opacity=30);
    -moz-opacity:0.3;
    -khtml-opacity: 0.3;
    opacity: 0.3;
  }
  .header .top_logo{
    margin:0 auto;
    width:750px;
    height:200px;
    position:absolute;
    z-index:30;
    top:10px;
    left: 50%;
    margin-left: -390px;
  }

  .header .nav{
    width:804px;
    height:auto;
    position:absolute;
    z-index:30;
    top:420px;
    left: 50%;
    margin-left: -400px;
  }
  .header .nav a.gv {
    text-decoration:none;
    width: 130px;
    height: 43px;
    display: block;
    text-align:center;
    line-height:43px;
    cursor:pointer;
    float:left;
    margin:8px 2px 8px 2px;
    font:18px/43px 'microsoft yahei'; color:#066197;
  }
  .header .nav a.gv span {
    display: none;

  }
  .header .nav a.gv:hover {
    color:#1d7eb8;
    -webkit-box-shadow: 0 0 6px #1d7eb8;
    transition-duration: 0.5s;
  }

  .header .topcn{
    width: 980px;
    top:200px;
    left: 50%;
    margin-left: -490px;
    position:absolute;
    z-index:20;

  }
</style>
