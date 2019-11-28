<template>
  <div>
    <Header></Header>
    <div class="reg background">
      <form id="reg-form" @submit.prevent="">
        <div class="form-info">
          <div class="input-info">
            <label class="reg_input">用户名<span class="bs">*</span>：
              <input type="text" v-model="formMess.username" placeholder="请输入用户名">
            </label>
          </div>
          <span class="error" v-if="errors['formMess.username']">{{errors['formMess.username']}}
          </span>
        </div>
        <div class="form-info">
          <div class="input-info">
            <label class="reg_input">昵称<span class="bs">*</span>：
              <input type="text" placeholder="请输入昵称" v-model="formMess.nickname">
            </label>
          </div>
          <span class="error" v-if="errors['formMess.nickname']">{{errors['formMess.nickname']}}
          </span>
        </div>
        <div class="form-info">
          <div class="input-info">
            <label class="reg_input">密码<span class="bs">*</span>：
              <input type="password" placeholder="请输入密码" v-model="formMess.password"
                     id="user_password">
            </label>
          </div>
          <span class="error" v-if="errors['formMess.password']">{{errors['formMess.password']}}
          </span>
        </div>
        <div class="form-info">
          <div class="input-info">
            <label class="reg_input">生日：
              <input type="date" name="birthday" v-model="formMess.date">
            </label></div>
        </div>
        <div class="form-info">
          <div class="input-info">
            <label class="reg_input">电话：
              <input type="text" placeholder="请输入电话号码" name="phone" v-model="formMess.phone">
            </label>
          </div>
          <span class="error" v-if="errors['formMess.phone']">{{errors['formMess.phone']}}</span>
        </div>
        <div class="form-info">
          <div class="input-info">
            <label class="reg_input">邮箱<span class="bs">*</span>：
              <input type="text" placeholder="请输入邮箱" name="email" v-model="formMess.email">
            </label>
          </div>
          <span class="error" v-if="errors['formMess.email']">{{errors['formMess.email']}}</span>
        </div>
        <div class="form-info">
          <div class="input-info">
            <label>
              <input type="text" placeholder="请输入验证码" v-model="formMess.verification_code">
            </label>
            <button>发送验证码</button>
          </div>
          <span class="error" v-if="errors['formMess.verification_code']">
            {{errors['formMess.verification_code']}}
          </span>
        </div>
        <label>
          <input id="reg-button" @close="reg()" type="button" value="注册">
          <div class="redirect_log"><span>已有账号?</span><a href="#">去登录</a></div>
        </label>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuerify from 'vuerify';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import $ from 'jquery';
// eslint-disable-next-line import/extensions
import Header from '@/components/Header';

Vue.use(Vuerify /* , add rules */);
export default {
  name: 'Registered',
  components: { Header },
  data() {
    return {
      formMess: {
        username: '',
        nickname: '',
        password: '',
        phone: '',
        date: new Date(),
        email: '',
        verification_code: '',
      },
    };
  },
  vuerify: {
    'formMess.username': {
      test: /\w{4,}/,
      message: '至少 4 位字符',
    },
    'formMess.nickname': {
      test: /\w{6,10}/,
      message: '6 ~ 10位字符',
    },
    'formMess.password': {
      test: /\w{8,16}/,
      message: '8 ~ 16 位字符',
    },
    'formMess.phone': {
      test: /^[1][3,4,5,7,8][0-9]{9}$/,
      message: '电话号码错误',
    },
    'formMess.email': {
      test: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
      message: '邮箱错误',
    },
    'formMess.verification_code': {
      test: /\w{4,}/,
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
    reg() {
      /* json格式提交： */
      // let formData = JSON.stringify(this.formMesse);
      const verifyList = ['form.username', 'form.nickname'];
      // check() 校验所有规则，参数可以设置需要校验的数组
      if (!this.$vuerify.check(verifyList)) {
        return;
      }
      console.log('验证通过');
      /* formData格式提交： */
      const formData = new FormData();
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in this.formMess) {
        formData.append(key, this.formMess[key]);
      }
      axios({
        method: 'post',
        url: 'xxxxxxx',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        data: formData,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
  input {
    background: #e6eee5;
    outline: none;
  }

  .background {
    width: 54%;
    background-color: #f4e9f2;
    margin: 0 auto 30px;
    border: 1px solid #f4eeeb;
    border-radius: 13px;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.5);
  }

  .form-info {
    display: flex;
    flex: 6;
    justify-content: center;
    position: relative;
  }

  .input-info {
    display: flex;
    flex-grow: 0.6;
    align-content: center;
    justify-content: center;
  }

  .reg_input {
    display: flex;
    align-items: center;
    flex-grow: 10;
    justify-content: center;
    margin: 20px;
  }

  .reg_input input {
    width: 37%;
    height: 35px;
    border-radius: 16px;
    border: 1px solid #f4b3cf;
    text-indent: 6px;
    flex: 3;
    flex-grow: 0.6;
  }

  .bs {
    color: red;
    font-size: 18px;
  }

  #reg-button {
    width: 70px;
    height: 40px;
    margin: 25px 40px 20px 20px;
    border-radius: 12px;
    border: 1px solid #f4b3cf;
    position: relative;
    right: 40px;
    text-align: center;
  }

  label a, span {
    color: #2F96F4;
    font-size: 12px;
  }

  a:hover {
    color: #f4b3cf;
  }

  .redirect_log {
    display: inline-block;
  }

  .error {
    position: absolute;
    right: 20%;
    top: 33px;
    color: red;
  }
  #reg_password_message{
    visibility: hidden;
  }
</style>
