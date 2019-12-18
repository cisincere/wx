<template>
  <div class="infinite-list-wrapper" id="iis" style="overflow:auto">
    <div class="list">
      <div v-for="(value, index) in index_img" class="list-item" :key="index">
        <el-image :src="value" :preview-src-list="[value]" fit="cover"
                  class="list-img" lazy/>
      </div>
  </div>
    <p v-if="load">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';
import $ from 'jquery';

export default {
  name: 'IndexImgShow',
  data() {
    return {
      load: false,
      noMore: false,
      flg: true,
      start: 0,
      end: 60,
      index_img: [],
    };
  },
  created() {
    const data = {};
    data.start = this.start;
    data.end = this.end;
    // eslint-disable-next-line no-useless-escape
    data.path = 'F:/VuePOJO/wx/src/static/index';
    this.$http({
      method: 'POST',
      url: 'p/img/',
      data: qs.stringify(data),
    }).then((res) => {
      const { files } = res.data;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files.length; i++) {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        files[i] = require(`../static/index/${files[i]}`);
      }
      this.start += 60;
      this.end += 60;
      this.index_img = files;
    });
  },
  mounted() {
    window.addEventListener('scroll', this.loads);
  },
  computed: {
  },
  methods: {
    loads() {
      const ch = document.documentElement.clientHeight;
      const sh = document.documentElement.scrollHeight;
      const top = document.documentElement.scrollTop
          || document.body.scrollTop || window.pageYOffset;
      if (ch + top === sh && this.flg) {
        if (this.start > 180) {
          this.load = false;
          this.noMore = true;
          return;
        }
        this.load = true;
        this.flg = false;
        setTimeout(() => {
          const data = {};
          data.start = this.start;
          data.end = this.end;
          // eslint-disable-next-line no-useless-escape
          data.path = 'F:/VuePOJO/wx/src/static/index';
          this.$http({
            method: 'POST',
            url: 'p/img/',
            data: qs.stringify(data),
          }).then((res) => {
            const { files } = res.data;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < files.length; i++) {
              // eslint-disable-next-line import/no-dynamic-require,global-require
              files[i] = require(`../static/index/${files[i]}`);
            }
            this.start += 60;
            this.end += 60;
            this.index_img = this.index_img.concat(files);
            this.load = false;
            this.flg = true;
          });
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
.list-item{
  width: 17%;
  margin: 0 auto;
  float: left;
  margin-left: 45px;
  margin-bottom: 34px;
  background: white;
  position: relative;
}
.list{
  overflow: hidden;
}
.list-img{
  width: 230px;
  height: 230px;
  position: relative;
  margin-top: 1%;
}
</style>
