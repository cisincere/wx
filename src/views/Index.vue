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
                     <img :src="def_src" alt=""/>
                   </el-avatar>
                 </el-col>
               </li>
               <li v-for="(info, index) in user_info" :key="index">
                 <router-link :to="info.href">
                  <span>{{ info.key }}</span>
                 </router-link>
               </li>
             </ul>
            </el-col>
          </el-col>
        </el-row>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
// eslint-disable-next-line camelcase
import default_path from '../static/akari.jpg';

export default {
  data() {
    return {
      def_src: default_path,
      user_info: [{ key: '登录', href: 'login' }, { key: '注册', href: 'reg' }],
      index_menu: ['主页', '分区', '主站', '源码查看'],
      search_word: '',
    };
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
  a{
    text-decoration: none;
    color: white;
  }
  a:hover{
    color: cadetblue;
  }
</style>
