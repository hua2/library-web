<template>
  <div class="login-layout">
    <div class="login-header flex items-center">
      <Logo />
      <span class="l-h-line ml-24"></span>
      <span class="l-h-title ml-24">欢迎登录</span>
    </div>
    <div class="login-bg">
      <div class="login-content flex justify-between">
        <div class="l-c-left flex justify-between"></div>
        <div class="l-c-right relative">
          <router-view />
        </div>
      </div>
    </div>
    <!--    <div class="login-footer">-->
    <!--      <LoginFooter />-->
    <Footer />
    <!--    </div>-->
  </div>
</template>

<script>
import Logo from '@/components/Logo/index'
import Footer from '@/components/Footer/index'
export default {
  name: 'LoginLayout',
  components: { Footer, Logo }
}
</script>

<style lang="scss" scoped>
.login-layout {
  min-width: 1144px;
  height: 1024px;
  .login-header {
    width: 1144px;
    height: 88px;
    padding-top: 18px;
    margin: 0 auto;
    .l-h-line {
      width: 0;
      height: 36px;
      border: 1px solid rgba(153, 153, 153, 1);
    }
    .l-h-title {
      font-size: 20px;
      font-weight: 400;
      color: rgba(215, 38, 46, 1);
    }
  }
  .login-bg {
    height: 600px;
    background: url("../assets/img/bg-login.png") no-repeat;
    background-size: cover;
  }
  .login-content {
    width: 1144px;
    margin: 0 auto;
    height: 600px;
    .l-c-left {
      width: 760px;
      margin-top: 140px;
    }
    .l-c-right {
      width: 328px;
      height: 328px;
      margin-top: 136px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    }
  }
  .login-footer {
    width: 1144px;
    margin: 0 auto;
  }
}
</style>
