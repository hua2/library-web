<template>
  <div class="main">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(b,index) in bannerData" :key="index">
        <a :href="b.jumpUrl" target="_blank"><img :src="b.imgUrl" alt=""></a>   </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination swiper-pagination-bullets"
      ></div>
    </swiper>
    <div class="header">
      <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <div class="flex justify-between">
          <div class="flex">
            <img src="../../assets/img/logo-main.png" alt="" @click="$router.push('/home')">
            <el-submenu index="1" class="h-sub">
              <template slot="title">图片</template>
              <el-menu-item v-for="(h,index) in hideData" :key="index" index="index" @click="picLink(h.id)">{{ h.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item index="2" @click="picLink(23)"> <i class="el-icon-menu"></i>人物</el-menu-item>
          </div>
          <div class="flex">
            <el-menu-item index="3" @click="authClick"> <i class="el-icon-upload"></i>供图</el-menu-item>
            <template v-if="!account.mobile">
              <el-menu-item index="4">
                <a
                  href="javascript:"
                >注册</a>
              </el-menu-item>
              <el-menu-item index="5"><a
                href="javascript:"
              >登录</a></el-menu-item>
            </template>
            <template v-else>
              <el-submenu index="6" class="h-sub">
                <template slot="title">个人中心</template>
                <!--                <el-menu-item index="2-1" @click="$router.push('/personal/index')">个人信息</el-menu-item>-->
                <el-menu-item index="2-2" @click="$router.push('/personal/account')">账户信息</el-menu-item>
                <el-menu-item index="2-3" @click="$router.push('/personal/updatePwd')">修改密码</el-menu-item>
                <el-menu-item index="2-3" @click="exitLogout">退出</el-menu-item>
              </el-submenu>
            </template>

          </div>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Header',
  components: { swiper, swiperSlide },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        autoplay: true,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-navbar"></span>`
          }
        }
      },
      hideData: [],
      bannerData: []
    }
  },
  computed: {
    account() {
      return this.$store.state.account.account
    }
  },
  created() {
    this.hideList()
    this.bannerList()
  },
  methods: {
    bannerList() {
      this.$api.user.bannerList().then(res => {
        if (res.code === 1000) {
          this.bannerData = res.data
        }
      })
    },
    authClick() {
      if (this.account.authStatus === 0) {
        this.$router.push({
          path: '/attest/index',
          query: { status: 0 }
        })
      } else if (this.account.authStatus === 3) {
        this.$router.push('/attest/underReview')
      } else if (this.account.authStatus === 4) {
        this.$router.push('/attest/refuseStatus')
      } else {
        this.$router.push('/publish/index')
      }
    },
    // 退出登录
    exitLogout() {
      this.$store.commit('logout')
      this.$router.push('/login/index')
    },
    picLink(id) {
      this.$router.push({
        path: '/home/display',
        query: { id: id }
      })
    },
    hideList() {
      this.$api.user.hideList().then(res => {
        if (res.code === 1000) {
          this.hideData = res.data
        }
      })
    },
    handleSelect(key, keyPath) {
      if (key === '3') {
        this.authClick()
      }
      if (key === '4') {
        this.$router.push('/regist/index')
      }
      if (key === '5') {
        this.$router.push('/login/index')
      }
      if (key === '6') {
        this.$router.push('/personal/account')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  position: relative;
  img{
    width: 100%;
    height: 480px;
    object-fit: cover;
  }
  .header {
    position: absolute;
    top: 6px;
    left: 24px;
    right: 24px;
    z-index: 4;
    cursor: pointer;
    img{
      width: 110px;
      height: 58px;
    }
    .el-menu{
      background-color: transparent;
      border: unset;
    }
    .el-menu-item{
      color: #ffffff;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
    .el-menu-item [class^="el-icon-"]{
      color: #ffffff;
    }
    .el-menu-item:hover, .el-menu-item:focus{
      color: #909399;
      background-color: transparent;
    }
    .el-menu--horizontal > .el-menu-item{
      border: unset;
      &.is-active{
        border: unset;
      }
    }
    /deep/{
      .el-submenu .el-submenu__title{
        color: #ffffff;
        font-size: 16px;
      }
      .el-submenu__title:hover{
        color: #909399;
        background: transparent;
      }
      .el-submenu__icon-arrow{
        right: 4px;
        font-size: 16px;
      }
    }
  }
}
</style>
