<template>
  <div class="reset-pwd">
    <div class="r-p-header  text-center">重置密码</div>
    <div class="r-p-logo mt-8 mb-16 flex justify-center">
      <img src="../../assets/img/user-logo.png" alt="" />
    </div>
    <div class="r-p-back" @click="$router.push('/login/forget-pwd')">
      <img src="../../assets/img/arrow-left.png" />
    </div>
    <div class="r-p-form">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="loginPwd">
          <el-input
            v-model="form.loginPwd"
            placeholder="请输入密码"
            type="password"
            clearable
          >
            <div
              slot="prepend"
              class="r-p-icon flex justify-center items-center"
            >
              <img src="../../assets/img/login-pwd.png" alt="" />
            </div>
          </el-input>
        </el-form-item>
        <el-form-item prop="loginPwd2">
          <el-input
            v-model="form.loginPwd2"
            placeholder="请输入确认密码"
            type="password"
            clearable
          >
            <div
              slot="prepend"
              class="r-p-icon flex justify-center items-center"
            >
              <img src="../../assets/img/login-pwd.png" alt="" />
            </div>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="w-full"
            :disabled="form.loginPwd === '' || form.loginPwd2 === ''"
            :loading="isLoading"
            @click="resetPwd"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/**
 * 登录-重设密码模块
 * @author lyh
 * @date 2019-07-09
 */
export default {
  name: 'ForgetPwd',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.loginPwd2 !== '') {
          this.$refs.form.validateField('loginPwd2')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.form.loginPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        loginPwd: '',
        loginPwd2: ''
      },
      rules: {
        loginPwd: [{ validator: validatePass, trigger: 'blur' }],
        loginPwd2: [{ validator: validatePass2, trigger: 'blur' }]
      },
      isLoading: false
    }
  },
  created() {
    const forgetValidation = this.$store.state.account.forgetValidation
    if (forgetValidation === null) {
      this.$router.push('/login/forget-pwd')
    }
  },
  methods: {
    resetPwd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const forgetValidation = this.$store.state.account.forgetValidation
          if (forgetValidation === null) {
            this.$message({
              duration: 1500,
              message: '请返回重新校验！',
              type: 'error'
            })
            return
          }
          this.$api.user
            .forgetPwd({
              mobile: forgetValidation.mobile,
              identifyCode: forgetValidation.identifyCode,
              loginPwd: this.form.loginPwd
            })
            .then(res => {
              if (res.code === 1000) {
                this.$message({
                  duration: 1500,
                  message: '重置密码成功，请登录！',
                  type: 'success'
                })
                this.$router.push('/login/index')
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.reset-pwd {
  .r-p-form {
    width: 280px;
    margin: 0 auto;
  }
  .r-p-header {
    color: #d7262e;
    font-size: 20px;
    font-weight: 400;
    padding-top: 16px;
    height: 44px;
  }
  .r-p-error {
    bottom: 82px;
    left: 28px;
  }
  .r-p-back {
    position: absolute;
    left: 21px;
    top: 19px;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .r-p-logo {
    img {
      width: 98px;
      height: 52px;
    }
  }
  .r-p-icon {
    width: 42px;
    height: 42px;
    background-color: #d7262e;
    border-radius: 4px 0 0 4px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .r-p-code {
    .el-input {
      width: 174px;
    }
    .el-button {
      width: 96px;
    }
  }
}
</style>
