<template>
  <div class="forget-pwd">
    <div class="f-p-header  text-center">重置密码</div>
    <div class="f-p-logo mt-8 mb-16 flex justify-center">
      <img src="../../assets/img/user-logo.png" alt="" />
    </div>
    <div class="f-p-back" @click="$router.push('/login/index')">
      <img src="../../assets/img/arrow-left.png" />
    </div>
    <div class="f-p-form">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="验证保密手机"
            auto-complete="off"
            clearable
          >
            <div
              slot="prepend"
              class="f-p-icon flex justify-center items-center"
            >
              <img src="../../assets/img/login-user.png" alt="" />
            </div>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="f-p-code flex justify-between">
            <el-input v-model="form.identifyCode" auto-complete="off">
            </el-input>
            <el-button
              type="primary"
              class="p-0"
              plain
              :disabled="showTimer || form.mobile === ''"
              @click="getCode"
            >
              <template
                v-if="showTimer"
              >{{ count }}s</template>
              <template
                v-else
              >获取验证码</template>
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="w-full"
            :disabled="form.mobile === '' || form.identifyCode === ''"
            :loading="isLoading"
            @click="forgetPwd"
          >验证手机号码重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/**
 * 登录-忘记密码模块
 * @author lyh
 * @date 2020-11-25
 */
export default {
  name: 'ForgetPwd',
  components: { },
  data() {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    const validateMobile = (rule, value, callback) => {
      if (value === '' || !reg.test(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
    return {
      form: {
        mobile: '',
        identifyCode: ''
      },
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }]
      },
      isLoading: false,
      showTimer: false,
      count: 0,
      timer: null
    }
  },
  methods: {
    forgetPwd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$api.user
            .validateIdentifyCode({
              mobile: this.form.mobile,
              identifyCode: this.form.identifyCode,
              type: '4'
            })
            .then(res => {
              if (res.code === 1000) {
                this.$message({
                  duration: 1500,
                  message: '验证码正确，请填写新密码！',
                  type: 'success'
                })
                this.$store.commit('setForgetValidation', {
                  mobile: this.form.mobile,
                  identifyCode: this.form.identifyCode
                })
                this.$router.push('/login/reset-pwd')
              }
            })
        }
      })
    },
    getMobileIdentifyCode() {
      this.$api.user
        .sendMobileIdentifyCode({
          type: '4',
          mobile: this.form.mobile
        })
        .then(() => {
          this.$message({
            duration: 1500,
            message: '短信已发送成功，请注意查收！',
            type: 'success'
          })
        })
    },
    getCode() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.getMobileIdentifyCode()
          const TIME_COUNT = 60
          if (!this.timer) {
            this.count = TIME_COUNT
            this.showTimer = true
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.showTimer = false
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.forget-pwd {
  .f-p-form {
    width: 280px;
    margin: 0 auto;
  }
  .f-p-header {
    color: #d7262e;
    font-size: 20px;
    font-weight: 400;
    padding-top: 16px;
    height: 44px;
  }
  .f-p-c-error {
    bottom: 82px;
    left: 28px;
  }
  .f-p-m-error {
    bottom: 146px;
    left: 28px;
  }
  .f-p-back {
    position: absolute;
    left: 21px;
    top: 19px;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .f-p-logo {
    img {
      width: 98px;
      height: 52px;
    }
  }
  .f-p-icon {
    width: 42px;
    height: 42px;
    background-color: #d7262e;
    border-radius: 4px 0 0 4px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .f-p-code {
    .el-input {
      width: 174px;
    }
    .el-button {
      width: 96px;
    }
  }
}
</style>
