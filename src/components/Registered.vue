<template>
  <div>
  <Header></Header>
  <div class="reg background">
    <label class="reg_input">用户名<span class="bs">*</span>：
      <input id="username" type="text" placeholder="请输入用户名" name="username">
    </label>
    <label class="reg_input">昵称<span class="bs">*</span>：
      <input  type="password" placeholder="请输入昵称" name="password">
    </label>
    <label class="reg_input">密码<span class="bs">*</span>：
      <input  type="password" placeholder="请输入密码" name="password">
    </label>
    <label class="reg_input">密码<span class="bs">*</span>：
      <input  type="password" placeholder="确认密码" name="password">
    </label>
    <label class="reg_input">生日：
      <input  type="date" name="password">
    </label><label class="reg_input">电话：
    <input  type="password" placeholder="请输入电话号码" name="password">
  </label>
    <label class="reg_input">邮箱：
      <input  type="password" placeholder="请输入邮箱" name="password">
    </label>
    <label>
      <input id ="reg-button" type="button" value="注册">
      <div class="redirect_log"><span>已有账号?</span><a href="#">去登录</a></div>
    </label>
  </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Header from '@/components/Header';

export default {
  name: 'Registered',
  components: { Header },
};
</script>

<style scoped>
  input{
    background: #e6eee5;
    outline: none;
  }
  .background {
    width: 54%;
    background-color: #f4e9f2;
    margin: 0 auto 30px;
    border: 1px solid #f4eeeb;
    border-radius: 13px;
    box-shadow: 2px 2px 8px 2px rgba(0,0,0,0.5);
  }

  .reg_input {
    display: block;
  }
  .reg_input input{
    width: 37%;
    height: 35px;
    border-radius: 16px;
    border: 1px solid #f4b3cf;
    margin: 17px 0 1px;
    text-indent: 6px;
  }
  #username{
    position: relative;
    right: 8px;
  }

  .bs{
    color: red;
    font-size: 18px;
  }
  #reg-button{
    width: 70px;
    height: 40px;
    margin: 25px 40px 20px 20px;
    border-radius: 12px;
    border: 1px solid #f4b3cf;
    position: relative;
    right: 40px;
    text-align: center;
  }
  label a,span{
    color: #2F96F4;
    font-size: 12px;
  }
  a:hover{
    color: #f4b3cf;
  }
  .redirect_log{
    display: inline-block;
  }
</style>
