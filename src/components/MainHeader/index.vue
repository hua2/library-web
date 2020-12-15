<template>
  <div class="main-header h-64 bg-black-1a">
    <div class="content h-64 flex justify-between">
      <div class="flex items-center">
        <MainLogo />
      </div>
      <div class="m-h-right flex items-center">
        <el-menu class="el-menu-demo" mode="horizontal">
          <template v-if="account.mobile">
            <el-submenu index="1" class="h-sub">
              <template slot="title">
                <img
                  v-if="account.headPic"
                  class="user-avatar"
                  :src="account.headPic"
                  alt=""
                />
                <img
                  v-else
                  class="user-avatar"
                  src="../../assets/img/default-avatar.png"
                  alt=""
                />
                <span class="truncate">{{ account.nickname ? account.nickname : account.mobile }}</span>
              </template>
              <el-menu-item index="2-1" @click="$router.push('/personal/index')">个人信息</el-menu-item>
              <el-menu-item index="2-2" @click="$router.push('/personal/account')">账户信息</el-menu-item>
              <el-menu-item index="2-3" @click="$router.push('/personal/updatePwd')">修改密码</el-menu-item>
              <el-menu-item index="2-3" @click="exitLogout">退出</el-menu-item>
            </el-submenu>
          </template>
          <el-submenu index="2">
            <template slot="title">图片</template>
            <el-menu-item v-for="(h,index) in hideData" :key="index" index="index" @click="picLink(h.id)">{{ h.title }}</el-menu-item>
          </el-submenu>
          <!--          <el-menu-item index="3"> <i class="el-icon-menu"></i>人物</el-menu-item>-->
          <el-menu-item index="4" @click="authClick"> <i class="el-icon-upload"></i>供图</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import MainLogo from '@/components/MainLogo/index'
export default {
  name: 'MainHeader',
  components: { MainLogo },
  data() {
    return {
      hideData: []
    }
  },
  computed: {
    account() {
      return this.$store.state.account.account
    }
  },
  created() {
    this.hideList()
  },
  methods: {
    authClick() {
      if (this.account.authStatus === 0) {
        this.$router.push('/attest/index')
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
    hideList() {
      this.$api.user.hideList().then(res => {
        if (res.code === 1000) {
          this.hideData = res.data
        }
      })
    },
    picLink(id) {
      this.$router.push({
        path: '/home/display',
        query: { id: id }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main-header {
  /deep/{
    .el-menu{
      background-color: transparent;
      border: unset;
    }
    .el-menu--horizontal > .el-submenu .el-submenu__title{
      color: #ffffff;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
    .el-menu--horizontal > .el-submenu .el-submenu__title:hover{
      background-color: transparent;
    }
  }
  a {
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
  }
  .shop-car {
    width: 16px;
    height: 16px;
  }
  .m-h-right {
    width: fit-content;
    span{
      width: 88px;
      margin-left: 8px;
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
      //&:hover{
      //  color: #909399;
      //}
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
