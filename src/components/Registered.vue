<template>
  <div>
    <Header></Header>
    <div class="reg_form">
      <el-form v-model="form" label-position="right" label-width="80px">
        <el-row type="flex" class="one-el-row">
          <el-col :span="11">
          <el-form-item label="用户名:">
            <el-input v-model="form.username" clearable></el-input>
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
            <el-input v-model="form.nickname" clearable></el-input>
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
            <el-input v-model="form.password" show-password clearable></el-input>
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
            <el-input v-model="form.age" clearable></el-input>
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
              <el-input v-model="form.email" clearable></el-input>
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
            <el-input class="ver" v-model="form.ver_code" placeholder="输入验证码"></el-input>
          </el-form-item>
          </el-col>
          <el-col class="el-col-button" :span="3">
            <el-button class="send_email" type="primary" @click="send_email()">发送验证码</el-button>
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
            <el-link type="primary" href="#" class="reg-el-link" :underline="false">
              已有账号?去登陆</el-link>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <foot></foot>
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
axios.defaults.baseURL = '/java';
Vue.use(Vuerify /* , add rules */);
export default {
  name: 'Registered',
  components: { foot, Header },
  data() {
    return {
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
    console.log('assets/imgs');
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
      test: /\d{1,2}/,
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
  mounted() {
    setInterval(() => {}, 2);
  },
  methods: {
    send_email() {
      const data = { email: this.form.email };
      axios({
        method: 'post',
        url: '/user/reg/send_email',
        data: qs.stringify(data),
      }).then((res) => {
        console.log(res);
      });
    },
    reg() {
      /* json格式提交： */
      // let formData = JSON.stringify(this.formMesse);
      const verifyList = ['form.username', 'form.password', 'form.email'];
      if (!this.$vuerify.check(verifyList)) {
        return;
      }
      console.log('验证通过');
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
        url: '/user/reg',
        data: qs.stringify(data),
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
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
