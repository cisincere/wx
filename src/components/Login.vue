<template>
  <div class="cv">
    <canvas id="canvas" :style="{height: screenHeight + 'px'}"></canvas>
    <div class="login-form">
      <el-form v-model="form" label-position="right" label-width="80px">
        <el-row type="flex">
          <el-col :span="12">
            <div class="user-header-img">
              <el-image :src="img_path ? img_path:require('../static/akari.jpg')"/>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" class="one-el-row">
          <el-col :span="12">
            <el-form-item label="用户名:" class="blue-label-font">
              <el-input v-model="form.username" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="密码:" class="blue-label-font">
              <el-input v-model="form.password" show-password clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item>
              <el-button @click="login()" type="primary" class="log_button">登录</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button @click="reg()" type="primary" class="log-reg_button">注册</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';
import axios from 'axios';

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      img_path: '',
      screenHeight: window.innerHeight,
    };
  },
  mounted() {
    // eslint-disable-next-line no-underscore-dangle
    const _this = this;
    // eslint-disable-next-line func-names
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

    // eslint-disable-next-line func-names
    const Star = function () {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 8;
      // 星星大小
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000;
      // 星星移动速度
      this.alpha = random(5, 10) / 10;

      // eslint-disable-next-line no-plusplus
      count++;
      stars[count] = this;
    };

    // eslint-disable-next-line func-names
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
  methods: {
    addClass(val) {
      document.getElementById(val).style.color = 'black';
      // document.getElementById('register').style.color = 'black'
    },
    deleteClass(val) {
      document.getElementById(val).style.color = '';
    },
    login() {
      const data = this.form;
      axios({
        method: 'post',
        url: '/api/user/login',
        data: qs.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          // eslint-disable-next-line no-shadow,camelcase
          const user_info = new Map();
          // eslint-disable-next-line no-shadow
          const { data } = res.data;
          user_info.set('email', data.email);
          user_info.set('id', data.id);
          user_info.set('nickname', data.nickname);
          user_info.set('个人主页', `/${data.id}`);
          user_info.set('消息', '/reply');
          user_info.set('动态', '/t');
          user_info.set('收藏', '/favlist');
          user_info.set('历史', '/history');
          console.log(user_info);
          this.$store.commit('setUser', user_info);
          this.$router.replace('/');
        }
      });
    },
    reg() {
      this.$router.replace('/reg');
    },
  },
};
</script>

<style lang="scss">
  canvas {
    width: 100%;
    height: auto /*默认全屏显示 可自己设置高度640px*/
  ;
    display: inline-block;
    vertical-align: baseline;
    z-index: -1;
  }

  .blue-label-font .el-form-item__label {
    color: #4aa6de;
  }

  .login-form {
    position: absolute;
    top: 35%;
    width: 45%;
    left: 26%;
    border-radius: 3%;
  }

  .user-header-img {
    width: 50%;
    margin: 0 auto;
    border-radius: 50%;
  }

  .user-header-img > .el-image {
    width: 50%;
    border-radius: 50%;
  }

  .el-form {
    overflow: hidden;
  }

  .el-input__inner {
    border: 1px solid rgba(106, 162, 255, 0.43) !important;
  }

  .el-col {
    position: relative;
    margin-bottom: 20px !important;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-row {
    justify-content: center;
  }

  .log_button .log-reg_button {
    margin-bottom: 0 !important;
  }

  .log_button {
    position: relative;
    left: -20%;
  }

  .log-reg_button {
    position: relative;
    left: 20%;
  }

  .canvas {
    width: 100%;
    background-image: url(../static/in_top_bj.jpg);
    height: 640px;
    position: absolute;
    z-index: 10;
    filter: alpha(opacity=40);
    -moz-opacity: 0.4;
    -khtml-opacity: 0.4;
    opacity: 0.4;
  }

  .cv {
    margin: 0 auto;
    width: 100%;
    height: 640px;
    background-color: #000;
    position: relative;
  }
</style>
