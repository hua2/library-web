<template>
  <div class="main-header h-64 bg-black-1a">
    <div class="content h-64 flex justify-between">
      <div class="flex items-center">
        <MainLogo />
      </div>
      <div class="m-h-right flex items-center">
        <div
          class="flex items-center mr-30"
          :class="!account.mobile ? 'm-h-r-avatar' : 'm-h-r-status'"
        >
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
          <template v-if="!account.mobile">
            <a
              href="javascript:"
              class="ml-14"
              @click="$router.push('/login/index')"
            >登录</a>
            <a
              href="javascript:"
              class="ml-12"
              @click="$router.push('/regist/index')"
            >注册</a>
          </template>
          <a v-else href="javascript:" class="ml-14 truncate">{{
            account.nickname ? account.nickname : account.nickname
          }}</a>
          <img
            v-if="account.mobile"
            src="../../assets/img/arrow-down.png"
            alt=""
            class="m-h-r-arrow"
          />
          <div v-if="account.mobile" class="m-h-r-hover text-12">
            <div class="m-h-r-info mb-12">
              <a
                href="javascript:"
                class="mr-48"
                @click="$router.push('/personal/collect')"
              >收藏记录</a>
            </div>
            <div class="m-h-r-info mb-12">
              <a
                href="javascript:"
                class="mr-48"
                @click="$router.push('/personal/download')"
              >下载记录</a>
            </div>
            <div class="m-h-r-info mb-12">
              <a
                href="javascript:"
                class="mr-48"
                @click="$router.push('/personal/buy')"
              >购买记录</a>
            </div>
            <div class="m-h-r-info mb-12">
              <a
                href="javascript:"
                class="mr-48"
                @click="$router.push('/personal/account')"
              >账户信息</a>
            </div>
            <div class="m-h-r-info mb-12">
              <a
                href="javascript:"
                class="mr-48"
                @click="$router.push('/personal/updatePwd')"
              >修改密码</a>
            </div>
            <div class="m-h-r-info mb-12">
              <a
                href="javascript:"
                class="mr-48"
                @click="$router.push('/personal/mobile')"
              >修改手机</a>
            </div>
            <div class="m-h-r-info flex" @click="exitLogout">
              <img
                src="../../assets/img/user-exit-icon.png"
                alt=""
                class="ml-24 mr-8"
              />
              退出
            </div>
          </div>
        </div>
        <a
          href="javascript:"
          class="flex items-center relative mr-32 pr-16"
          @click="$router.push('')"
        >
          <i class="el-icon-picture-outline"></i>
          <span>图片</span>
        </a>
        <a
          href="javascript:"
          class="flex items-center relative mr-32 pr-16"
          @click="$router.push('')"
        >
          <i class="el-icon-s-opportunity"></i>
          <span>人物</span>
        </a>
        <a
          href="javascript:"
          class="flex items-center relative mr-32 pr-16"
          @click="$router.push('')"
        >
          <i class="el-icon-upload"></i>
          <span>供图</span>
        </a>
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
    }
  },
  computed: {
    account() {
      return this.$store.state.account.account
    }
  },
  methods: {
    // 退出登录
    exitLogout() {
      this.$store.commit('logout')
      this.$router.push('/login/index')
    }
  }
}
</script>

<style scoped lang="scss">
.main-header {
  a {
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
  }
  .shop-car {
    width: 16px;
    height: 16px;
  }
  .m-h-right {
    width: fit-content;
    .m-h-r-avatar {
      width: fit-content;
    }
    .m-h-r-status {
      position: relative;
      padding: 0 20px;
      max-width: 192px;
      .m-h-r-arrow {
        width: 15px;
        height: 10px;
        margin-left: 8px;
      }
      .m-h-r-hover {
        display: none;
        width: 192px;
        height: fit-content;
        position: absolute;
        padding: 14px 0 14px 36px;
        top: 64px;
        z-index: 2001;
        cursor: pointer;
        color: #ffffff;
        background: rgba(45, 45, 45, 1);
        img {
          width: 20px;
          height: 20px;
        }
        .m-h-r-info {
          height: 20px;
          line-height: 20px;
         text-align: center;
        }
      }
    }
    .m-h-r-status {
      &:hover {
        height: 64px;
        background: #2d2d2d;
        .m-h-r-hover {
          display: block;
          left: 0;
          top: 64px;
        }
      }
    }
  }
}
</style>
