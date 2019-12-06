<template>
  <el-container>
    <el-header>
      <el-row>
        <el-row class="el-row-header-info" type="flex" :gutter="13" justify="space-between">
          <el-col class="el-col-header-margin-bottom" :span="4">
            <ul class="el-col-header-ul">
              <li v-for="(menus, index) in index_menu" :key="index">
                {{ menus }}
              </li>
            </ul>
          </el-col>
          <el-col class="el-col-header-margin-bottom el-col-search-form-info" :span="8">
            <el-col class="el-col-search-form">
              <el-form>
                <el-input v-model="search_word"></el-input>
                <el-button class="search-button" type="primary" icon="el-icon-search"></el-button>
              </el-form>
            </el-col>
          </el-col>
          <el-col class="el-col-header-margin-bottom" :span="4">
            <el-col>
             <ul class="el-col-header-ul el-col-header-ul-user">
               <li class="el-col-user-imge">
                 <el-col>
                   <el-avatar  :size="35">
                     <img :src="def_src" alt="" @mouseover="show_ifo()"/>
                   </el-avatar>
                 </el-col>
               </li>
               <li v-for="(value, key) in user_info" :key="key">
                 <router-link :to="value[1]">
                  <span>{{value[0]}}</span>
                 </router-link>
               </li>
             </ul>
            </el-col>
          </el-col>
        </el-row>
      </el-row>
    </el-header>
    <el-container>
      <el-container>
        <el-main>
          <el-row>
            <el-col>
              <RandomTextForColor></RandomTextForColor>
            </el-col>
          </el-row>
          <IndexImgShow></IndexImgShow>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';
import VUe from 'vue';
// eslint-disable-next-line camelcase
import default_path from '../static/akari.jpg';
// eslint-disable-next-line import/extensions
import RandomTextForColor from '@/components/RandomTextForColor';
// eslint-disable-next-line import/extensions
import IndexImgShow from '@/components/IndexImgShow';

export default {
  components: { RandomTextForColor, IndexImgShow },
  data() {
    return {
      switchForMore: false,
      nickname: '',
      id: '',
      email: '',
      def_src: default_path,
      user_info: new Map(),
      index_menu: ['主页', '分区', '主站', '源码查看'],
      search_word: '',
      index_main_menu: [{ key: '每日推荐', value: '/' },
        { key: '我的关注', value: '/' },
        { key: '最近更新', value: '/' },
        { key: '热门排行', value: '/' },
        { key: 'Pixiv', value: '/' },
        { key: '用户投稿', value: '/' },
        { key: '分类', value: '/' }],
    };
  },
  created() {
    this.user_info.set('登录', '/login');
    this.user_info.set('注册', '/reg');
    this.$store.commit('setIndexMainMenu', this.index_main_menu);
  },
  mounted() {
    const data = this.$store.getters.getUser;
    if (data.get('nickname') !== undefined) {
      this.id = data.get('id');
      data.delete('id');
      this.email = data.get('email');
      data.delete('email');
      this.nickname = data.get('nickname');
      data.delete('nickname');
      this.user_info = data;
    }
  },
  methods: {
    show_ifo() {},
    loadMore() {
      console.log(1);
    },
  },
};
</script>
<style>
  .el-header{
    min-height: 155px;
    height: 9.375vw !important;
    background-image: url("../assets/7197cae46569a49abd98e0c51348068831be6a85.png");
    background-color: rgba(0,0,0,0);
  }
  .el-header > .el-page-header{
    line-height: 80px;
  }
  .el-col-header-ul{
    display: flex;
    align-items: center;
    list-style: none;
    height: 66px;
    margin: 0;
    padding: 0;
    line-height: 66px;
    position: absolute;
    right: -100px;
  }
  .el-col-header-ul-user{
    right: 70px !important;
    top: -8px !important;
  }
  .el-col-header-ul li {
    margin: 0 4px !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "微软雅黑", Arial, sans-serif;
    color: white;
    font-size: 14px;
  }
  .el-col-user-imge{
    position: relative;
    top: -15px;
    left: 39px;
    margin: 0 !important;
  }
  .search-button{
    position: absolute;
    right: 0;
    top: 14px
  }
  .el-col-header-margin-bottom{
    justify-content: center;
    margin-bottom: 0 !important;
  }
  .el-col-search-form-info{
    line-height: 67px !important;
  }
  .el-col-search-form{
    margin-bottom: 0 !important;
  }
  .el-avatar--circle {
    border-radius: 50%;
    position: absolute;
    right: 40px;
    top: 10px;
  }
  .el-main{
    width: 80%;
    margin: 0 auto;
  }
  a{
    text-decoration: none;
    color: white;
  }
  a:hover{
    color: #2255a0;
  }
</style>
