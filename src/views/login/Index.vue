<template>
  <div class="login">
    <div class="login-header h-68 text-center">登录</div>
    <div class="login-form relative">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input
            v-model="form.mobile"
            placeholder="请输入账号"
            auto-complete="off"
            clearable
          >
            <div
              slot="prepend"
              class="l-f-icon flex justify-center items-center"
            >
              <img src="../../assets/img/login-user.png" alt="" />
            </div>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.loginCode"
            placeholder="请输入密码"
            auto-complete="off"
            type="password"
          >
            <div
              slot="prepend"
              class="l-f-icon flex justify-center items-center"
            >
              <img src="../../assets/img/login-pwd.png" alt="" />
            </div>
          </el-input>
        </el-form-item>
        <el-form-item class="l-f-login">
          <el-button
            type="primary"
            class="w-full"
            :disabled="form.loginCode === '' || form.mobile === ''"
            :loading="isLoading"
            @click="login"
          >登录</el-button>
        </el-form-item>
        <el-form-item class="l-f-agree">
          <div class="flex justify-between l-f-check">
            <el-checkbox v-model="agree">
              我同意<a
                href="javascript:"
                @click="serviceDialogClick"
              >《能源图库用户服务条款》</a>
            </el-checkbox>
            <el-checkbox
              v-model="remember"
              class="remember"
            >记住账号</el-checkbox>
          </div>
        </el-form-item>
        <div class="l-f-operation">
          <a
            href="javascript:"
            class="mr-12"
            @click="$router.push('/login/forget-pwd')"
          >忘记密码？</a>
          <a
            href="javascript:"
            @click="$router.push('/regist/index')"
          >免费注册</a>
        </div>
      </el-form>
    </div>
    <ServiceDialog ref="serviceDialog" />
  </div>
</template>

<script>
/**
 * 登录模块
 * @author lyh
 * @date 2020-12-09
 */
import ServiceDialog from '@/views/other/dialog/ServiceDialog'
export default {
  name: 'Login',
  components: { ServiceDialog },
  data() {
    return {
      form: {
        mobile: '',
        loginCode: ''
      },
      agree: true,
      remember: true,
      isLoading: false,
      redirect: this.$route.query.redirect
    }
  },
  watch: {
    $route(val) {
      this.redirect = val.query && val.query.redirect
    }
  },
  methods: {
    // 服务条款
    serviceDialogClick() {
      this.$refs.serviceDialog.dialogVisible = true
    },
    login() {
      if (!this.agree) {
        this.$message({
          duration: 1500,
          message: '请阅读并同意该协议！',
          type: 'warning'
        })
        return
      }
      this.isLoading = true
      this.$api.user.userLogin(this.form).then(res => {
        this.isLoading = false
        if (res.code === 1000) {
          if (res.data) {
            const data = res.data
            this.$store.commit('setToken', {
              token: data,
              remember: this.remember
            })
            this.$store.dispatch('getLoginUserDate')
          }
          this.$router.push({ path: this.redirect || '/personal/account' })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  .login-header {
    color: #d7262e;
    font-size: 20px;
    font-weight: 400;
    padding: 16px 0 24px 0;
  }
  .login-form {
    width: 280px;
    margin: 0 auto;
    .l-f-icon {
      width: 42px;
      height: 42px;
      background-color: #d7262e;
      border-radius: 4px 0 0 4px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .l-f-error {
      top: 110px;
      left: 2px;
    }
    .l-f-check {
      line-height: 20px;
      a {
        color: #4a90e2;
      }
      .el-checkbox {
        height: 20px;
        font-size: 12px;
        font-weight: 500;
        color: #999999;
        margin-right: 0;
      }
    }
    .l-f-operation {
      margin-top: 14px;
      text-align: right;
      color: #999999;
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>
