<template>
  <div>
    <div class="carousel-item-img">
   <div class="all_elc">
    <el-carousel :interval="2800" typeof="card" height="200px">
      <el-carousel-item v-for="left in files_left" :key="left">
        <el-row>
          <el-col :span="24"><img :src="left" class="item-img" alt=""/></el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
      <el-carousel :interval="2800" typeof="card" height="200px">
        <el-carousel-item v-for="right in files_right" :key="right">
          <el-row>
            <el-col :span="24"><img :src="right" class="item-img" alt=""/></el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
     </div>
    </div>
    <div class="reg_form">
      <el-form v-model="form" label-position="right" label-width="80px">
        <el-row type="flex" class="one-el-row">
          <el-col :span="11">
          <el-form-item label="用户名:">
            <el-input v-model="form.username" clearable/>
          </el-form-item>
          </el-col>
          <el-col class="error_col" :span="1">
            <span class="error" v-if="errors['form.username']">
            {{errors['form.username']}}
          </span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="11">
          <el-form-item label="昵称:">
            <el-input v-model="form.nickname" clearable/>
          </el-form-item>
          </el-col>
          <el-col class="error_col" :span="1">
            <span class="error" v-if="errors['form.nickname']">
            {{errors['form.nickname']}}
          </span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="11">
          <el-form-item label="密码:">
            <el-input v-model="form.password" show-password clearable/>
          </el-form-item>
          </el-col>
          <el-col class="error_col" :span="1">
            <span class="error" v-if="errors['form.password']">
            {{errors['form.password']}}
          </span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="11">
          <el-form-item label="年龄:">
            <el-input v-model="form.age" clearable/>
          </el-form-item>
          </el-col>
          <el-col class="error_col" :span="1">
            <span class="error" v-if="errors['form.age']">
            {{errors['form.age']}}
          </span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="11">
            <el-form-item label="邮箱:">
              <el-input v-model="form.email" clearable/>
            </el-form-item>
          </el-col>
          <el-col class="error_col" :span="1">
            <span class="error" v-if="errors['form.email']">
            {{errors['form.email']}}
          </span>
          </el-col>
        </el-row>
        <el-row type="flex" class="ver_lab">
          <el-col :span="8">
          <el-form-item label="验证码:">
            <el-input class="ver" v-model="form.ver_code" placeholder="输入验证码"/>
          </el-form-item>
          </el-col>
          <el-col class="el-col-button" :span="3">
            <el-button class="send_email" type="primary" @click="send_email()"
                       :disabled="isDisabled">{{value}}</el-button>
          </el-col>
          <el-col class="error_col" :span="1">
            <span class="error" v-if="errors['form.ver_code']">
            {{errors['form.ver_code']}}
          </span>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col class="reg-foot" :span="8">
          <el-form-item>
            <el-button @click="reg()" type="primary" class="reg_button">注册</el-button>
          </el-form-item>
          </el-col>
          <el-col class="reg-el-link-col" :span="4">
            <el-link type="primary" @click="toLogin()" class="reg-el-link" :underline="false">
              已有账号?去登陆</el-link>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>注册成功</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="toLogin()">确 定</el-button>
  </span>
    </el-dialog>

    <foot/>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuerify from 'vuerify';
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import Header from '@/components/Header';
// eslint-disable-next-line import/extensions
import foot from '@/components/foot';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = '/api';
Vue.use(Vuerify /* , add rules */);
export default {
  name: 'Registered',
  components: { foot },
  data() {
    return {
      files_left: [],
      files_right: [],
      isDisabled: false,
      value: '发送验证码',
      dialogVisible: false,
      time: 60,
      form: {
        username: '',
        nickname: '',
        password: '',
        age: '',
        email: '',
        ver_code: '',
      },
    };
  },
  created() {
    // eslint-disable-next-line camelcase
    const file_path = 'F:\\VuePOJO\\wx\\src\\static\\imgs';
    const data = { path: file_path };
    axios({
      method: 'POST',
      url: '/p/get/files/',
      data: qs.stringify(data),
    }).then((res) => {
      const { files } = res.data;
      let right = 0;
      let left = 0;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files.length; i++) {
        if (i % 2 === 0) {
          // eslint-disable-next-line import/no-dynamic-require,global-require
          Vue.set(this.files_right, right, require(`../static/imgs/${files[i]}`));
          // eslint-disable-next-line no-plusplus
          right++;
        } else {
          // eslint-disable-next-line import/no-dynamic-require,global-require
          Vue.set(this.files_left, left, require(`../static/imgs/${files[i]}`));
          // eslint-disable-next-line no-plusplus
          left++;
        }
      }
    });
  },
  vuerify: {
    'form.username': {
      test: /\w{4,8}/,
      message: '4到8位字符',
    },
    'form.nickname': {
      test: /\w{4,18}/,
      message: '4到18位字符',
    },
    'form.password': {
      test: /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/,
      message: '不包含特殊字符(?!.空格等),至少包含两种字符',
    },
    'form.age': {
      test: /^\d{1,2}$/,
      message: '年龄应为两位数',
    },
    'form.email': {
      // eslint-disable-next-line no-useless-escape
      test: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      message: '邮箱地址错误',
    },
    'form.ver_code': {
      test: /^\d{4,}$/,
      message: '验证码错误',
    },
  },
  computed: {
    // 计算属性，获取校验不通过的对象
    // 如 { "form.name": "至少 4 位字符", "form.desc": "至少 10 位字符" }
    errors() {
      return this.$vuerify.$errors;
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    send_email() {
      if (!this.isDisabled) {
        const data = { email: this.form.email };
        axios({
          method: 'post',
          url: '/api/user/reg/send_email',
          data: qs.stringify(data),
        });
        this.isDisabled = true;
        const interval = window.setInterval(() => {
          this.value = `${this.time}`;
          // eslint-disable-next-line no-plusplus
          --this.time;
          if (this.time < 0) {
            this.value = '重新发送';
            this.time = 10;
            this.isDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
      }
    },
    reg() {
      /* json格式提交： */
      // let formData = JSON.stringify(this.formMesse);
      const verifyList = ['form.username', 'form.password', 'form.email'];
      if (!this.$vuerify.check(verifyList)) {
        return;
      }
      const data = {};
      /* formData格式提交： */
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in this.form) {
        if (key !== 'ver_code') {
          data[key] = this.form[key];
        }
      }
      data.code = this.form.ver_code;
      axios({
        method: 'post',
        url: '/api/user/reg',
        data: qs.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          this.dialogVisible = true;
        }
      });
    },
    toLogin() {
      this.dialogVisible = false;
      this.$router.replace('/login');
    },
  },
};
</script>

<style>
  body{
    background: linear-gradient(to right, rgba(255, 206, 92, 0.24) 0%,
    rgba(144, 129, 255, 0.26) 100%) !important;
  }
  .el-carousel{
    width: 45%;
    display: inline-block;
  }
  .all_elc{
    margin: 0 auto;
  }
  .el-carousel__item>.el-row>.el-col{
    margin: 0 !important;
    padding: 0 !important;
  }
  .item-img{
    height: 200px;
    object-fit: cover;
  }
  .reg_form {
    width: 45%;
    margin: 0 auto;
    background: aliceblue;
    border-radius: 3%;
    margin-top: 30px;
  }
  .el-form{
    overflow: hidden;
  }
  .one-el-row{
    margin-top: 30px;
  }
  .ver_lab > .el-col > .el-form-item > .el-form-item__label{
    line-height: 70px;
  }
  .el-input__inner{
    border: 1px solid rgba(106, 162, 255, 0.43) !important;
  }
  .ver > .el-input__inner {
    height: 70px !important;
    font-size:24px !important;
  }
  .el-col{
    position: relative;
    margin-bottom: 26px;
    &:last-child {
       margin-bottom: 0;
     }
  }
  .el-row {
    justify-content: center;
  }
  .el-col-button{
    padding: 0;
    margin: 0;
  }
  .el-col-button > .send_email{
    height: 70px;
    width: 100%;
  }
  .reg_button{
    position: absolute;
    left: 10px;
    width: 130px;
    height: 60px;
    line-height: 40px;
  }
  .reg-foot > .el-form-item > .el-form-item__content{
    margin-left:0 !important;
  }
  .reg-el-link{
    position: relative;
    right: 110px;
    font-size: 14px;

  }
  .el-link--inner{
    position: relative;
    left: 40px;
  }
  .reg-el-link > span{
    line-height: 4;
  }
  .error_col{
    width: 14.16667% !important;
  }
  .error {
    font-size: 14px;
    color: red;
    /*width: 14.16667%;*/
  }
  .foot{
    margin-top: 40px;
    height: 120px !important;
  }
</style>
