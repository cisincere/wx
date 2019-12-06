<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <div
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-delay="3000"
      infinite-scroll-disabled="disabled">
      <div v-for="(value, index) in index_img" class="list-item" :key="index">
        <el-image :src="value" :preview-src-list="[value]" fit="cover"
                  class="list-img"/>
      </div>
    </div>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';

export default {
  name: 'IndexImgShow',
  data() {
    return {
      loading: false,
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
      console.log(files);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files.length; i++) {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        files[i] = require(`../static/index/${files[i]}`);
      }
      this.index_img = files;
    });
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        console.log(1);
        this.loading = false;
      }, 6000);
    },
  },
  computed: {
    noMore() {
      return this.start >= 120;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
};
</script>

<style scoped>
.list-item{
  width: 17%;
  margin: 0 auto;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
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
