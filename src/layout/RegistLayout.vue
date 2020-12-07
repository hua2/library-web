<template>
  <div class="regist-layout">
    <div class="regist-header flex justify-between">
      <div class="r-h-left flex items-center">
        <Logo />
        <span class="r-h-line ml-24"></span>
        <span class="r-h-title ml-24">欢迎注册</span>
      </div>
      <div class="r-h-right ">
        已有账号？去<a
          href="javascript:"
          class="r-h-title"
          @click="$router.push('/login/index')"
        >登录</a>
      </div>
    </div>
    <div class="regist-content flex justify-between">
      <router-view />
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo/index'
export default {
  name: 'RegistLayout',
  components: { Logo }
}
</script>

<style lang="scss" scoped>
.regist-layout {
  min-width: 1144px;
  height: 1024px;
  .regist-header {
    width: 1144px;
    height: 88px;
    padding-top: 18px;
    margin: 0 auto;
    .r-h-line {
      width: 0;
      height: 36px;
      border: 1px solid rgba(153, 153, 153, 1);
    }
    .r-h-title {
      font-size: 20px;
      font-weight: 400;
      color: rgba(215, 38, 46, 1);
    }
    .r-h-right {
      font-size: 20px;
      font-weight: 400;
      line-height: 70px;
    }
  }
  .regist-content {
    width: 1144px;
    margin: 0 auto;
    height: 428px;
    border-top: 1px solid rgba(215, 38, 46, 1);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
