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
                <el-input v-model="search_world" @input="search_data()"></el-input>
                <el-button class="search-button" type="primary" icon="el-icon-search"></el-button>
              </el-form>
            </el-col>
            <div class="querySearch-div" v-if="search_visible">
              <ul>
                <li v-for="(si,index) in search_item" :key="index" class="search-item" :id="index"
                    @mouseover="changeBackgroundColor(index)"
                    @mouseout="out(index)">
                  <router-link to="/"><span>{{si.title}}</span></router-link>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col class="el-col-header-margin-bottom" :span="4">
            <el-col>
             <ul class="el-col-header-ul el-col-header-ul-user">
               <li class="el-col-user-imge">
                 <el-col>
                   <el-avatar :size="35">
                     <el-image :src="def_src" alt="" @mouseover="visible=true"
                               @mouseout="visible=false"></el-image>
                   </el-avatar>
                   <el-popover
                     placement="bottom"
                     width="160"
                     trigger="hover"
                     :popper-class="popover_class"
                     v-model="visible">
                     <div style="text-align: center;font-size: 13px">
                       <p>.-.. --- --. .. -. </p>
                     </div>
                     <div style="text-align: center; margin: 0">
                       <router-link to='/reg'>
                       <el-button size="mini" type="text" @click="visible = false"
                                  style="margin-right: 10px">注册</el-button>
                       </router-link>
                       <router-link to="/login">
                       <el-button type="text" size="mini" @click="visible = false"
                                  style="margin-left: 10px">登录</el-button>
                       </router-link>
                     </div>
                   </el-popover>
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
    <div style="margin: 20px 0;">
      <el-carousel :interval="2800" typeof="card">
        <el-carousel-item v-for="image in carousel_image" :key="image">
          <el-row>
            <el-col :span="24"><img :src="image" class="index-item-img" alt=""/></el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
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
import $ from 'jquery';
import axios from 'axios';
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
      search_visible: false,
      carousel_image: [],
      popover_class: 'el-progress-no-login',
      switchForMore: false,
      visible: false,
      nickname: '',
      id: '',
      search_item: [],
      email: '',
      def_src: default_path,
      user_info: new Map(),
      index_menu: ['主页', '分区', '主站', '源码查看'],
      search_world: '',
      index_main_menu: [{ key: '每日推荐', value: '/recommend' },
        { key: '我的关注', value: '/follow' },
        { key: '最近更新', value: '/new' },
        { key: '热门排行', value: '/heat' },
        { key: 'Pixiv', value: '/pixiv' },
        { key: '视频', value: '/video' },
        { key: '分类', value: '/classification' }],
    };
  },
  created() {
    this.$store.commit('setIndexMainMenu', this.index_main_menu);
    // eslint-disable-next-line camelcase
    const state_code = this.$store.getters.getStateCode;
    this.user_info.set('登录', '/login');
    this.user_info.set('注册', '/reg');
    // eslint-disable-next-line camelcase
    if (!state_code) {
      axios({
        method: 'POST',
        url: '/api/user/index',
      }).then((res) => {
        if (res.data.state === 200) {
          this.user_info.clear();
          // eslint-disable-next-line no-shadow,camelcase
          const user_info = new Map();
          // eslint-disable-next-line no-shadow
          const { data } = res.data;
          this.email = data.email;
          this.id = data.id;
          this.nickname = data.nickname;
          user_info.set('个人主页', `/${data.id}`);
          user_info.set('消息', '/reply');
          user_info.set('动态', '/t');
          user_info.set('收藏', '/favlist');
          user_info.set('历史', '/history');
          // eslint-disable-next-line camelcase
          this.user_info = user_info;
        }
      });
    }
    // eslint-disable-next-line camelcase
    const file_path = 'F:\\VuePOJO\\wx\\src\\static\\imgs';
    const data = { path: file_path };
    this.$http({
      method: 'POST',
      url: '/p/get/index_img/',
      data: qs.stringify(data),
    }).then((res) => {
      const { files } = res.data;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files.length; i++) {
        // eslint-disable-next-line import/no-dynamic-require,global-require
        files[i] = require(`../static/imgs/${files[i]}`);
      }
      this.carousel_image = files;
    });
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
    search_data() {
      if (this.search_world !== '') {
        this.search_visible = true;
        const data = { searchWorld: this.search_world };
        this.$http({
          method: 'POST',
          url: '/api/search',
          data: qs.stringify(data),
        }).then((res) => {
          this.search_item = res.data.data;
        });
      } else {
        this.search_item = [];
        this.search_visible = false;
      }
    },
    changeBackgroundColor(id) {
      // eslint-disable-next-line camelcase
      const i_id = `#${id}`;
      $(i_id).css('background-color', 'rgba(5,9,21,0.21)');
    },
    out(id) {
      // eslint-disable-next-line camelcase
      const i_id = `#${id}`;
      $(i_id).css('background-color', '#fff');
    },
  },
};
</script>
<style>
  ul{
    list-style: none;
    padding: 0;
    margin-bottom: 0;
    margin-top: 10px;

  }
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
  .querySearch-div{
    right: 63px;
    top: 56px;
    width: 553px;
    /* height: 200px; */
    position: absolute;
    border-radius: 3px;
    background: white;
    z-index: 99999;
  }
  .search-item{
    height: 32px;
    line-height: 32px;
    text-align: left;
    text-indent: 10px;
  }
  .search-item > a{
    color: rgba(13, 5, 52, 0.9);
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "微软雅黑", Arial, sans-serif;
    font-size: 13px;
  }
  .el-avatar--circle {
    border-radius: 50%;
    position: absolute;
    right: 40px;
    top: 10px;
  }
  .index-item-img{
    height: 400px;
    object-fit: cover;
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
  .el-progress-no-login{
    top: 53px;
    right: -42px;
  }
</style>
