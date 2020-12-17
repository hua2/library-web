<template>
  <div class="regist w-full ">
    <div class="regist-form flex justify-center relative">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="small"
        label-position="left"
      >
        <el-form-item label="手机号码：" class="is-required">
          <el-input
            v-model="form.mobile"
            placeholder="请输入您的手机号码"
            clearable
          ></el-input>
        </el-form-item>
        <ErrorMessage
          v-if="mobile"
          class="r-f-m-error"
          text="请输入正确手机号！"
        />
        <el-form-item label="验证码：" class="is-required">
          <div class="r-f-code flex">
            <el-input v-model="form.identifyCode"> </el-input>
            <el-button
              type="primary"
              class="p-0 ml-16"
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
        <ErrorMessage
          v-if="identifyCode"
          class="r-f-i-error"
          text="验证码不正确！"
        />
        <el-form-item
          label="设置密码："
          prop="loginPwd"
          class="is-required"
        >
          <el-input
            v-model="form.loginPwd"
            placeholder="请输入密码"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码："
          prop="loginPwd2"
          class="is-required"
        >
          <el-input
            v-model="form.loginPwd2"
            placeholder="请再次输入密码"
            type="password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="r-f-agree">
          <el-checkbox v-model="agree">
            我已阅读并同意<a
              href="javascript:"
              @click="registrationClick"
            >《能源图库用户注册协议 》</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button
            class="r-f-btn"
            type="primary"
            :disabled="
              form.mobile === '' ||
                form.identifyCode === '' ||
                form.loginPwd === '' ||
                form.loginPwd2 === ''
            "
            @click="regist"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <RegistrationDialog ref="registrationDialog" />
  </div>
</template>

<script>
/**
 * 注册模块
 * @author lyh
 * @date 2019-07-10
 */
import ErrorMessage from '@/components/ErrorMessage/index'
import RegistrationDialog from '@/views/other/dialog/RegistrationDialog'
export default {
  name: 'Regist',
  components: { RegistrationDialog, ErrorMessage },
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
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.loginPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        mobile: '',
        identifyCode: '',
        loginPwd: '',
        loginPwd2: '',
        captcha: ''
      },
      rules: {
        loginPwd: [{ validator: validatePass, trigger: 'blur' }],
        loginPwd2: [{ validator: validatePass2, trigger: 'blur' }]
      },
      showTimer: false,
      count: 0,
      timer: null,
      agree: false,
      mobile: false, // 手机号码是否正确
      identifyCode: false // 验证码是否正确
    }
  },
  methods: {
    // 服务条款
    registrationClick() {
      this.$refs.registrationDialog.dialogVisible = true
    },
    getMobileIdentifyCode() {
      this.$api.user
        .sendMobileIdentifyCode({
          type: '2',
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
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      this.mobile = false
      if (!reg.test(this.form.mobile)) {
        this.mobile = true
        return
      }
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
    },
    regist() {
      if (!this.agree) {
        this.$message({
          duration: 1500,
          message: '请阅读并同意该协议！',
          type: 'warning'
        })
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$api.user.userRegister(this.form).then(res => {
            if (res.code === 1000) {
              this.login()
            }
          })
        }
      })
    },
    login() {
      this.$api.user
        .userLogin({
          mobile: this.form.mobile,
          loginCode: this.form.loginPwd
        })
        .then(res => {
          if (res.code === 1000) {
            if (res.data) {
              const data = res.data
              this.$store.commit('setToken', {
                token: data,
                remember: this.remember
              })
              this.$store.dispatch('getLoginUserDate')
            }
            this.$router.push('/regist/prompt')
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.regist-form {
  padding-top: 56px;
  .r-f-agree {
    text-align: center;
    a {
      color: #4a90e2;
    }
    .el-checkbox {
      line-height: 20px;
      height: 20px;
      font-size: 12px;
      font-weight: 500;
      color: #999999;
      margin-right: 0;
    }
  }
  .r-f-code {
    .el-input {
      width: 128px;
    }
    .el-button {
      width: 96px;
    }
  }
  .r-f-btn {
    width: 181px;
  }
  .r-f-c-error {
    top: 89px;
    left: 40%;
  }
  .r-f-m-error {
    top: 140px;
    left: 40%;
  }
  .r-f-i-error {
    top: 192px;
    left: 40%;
  }
}
</style>
