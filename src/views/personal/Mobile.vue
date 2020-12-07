<template>
  <div class="w-full">
    <PersonalHeader text="修改手机" />
    <div class="mobile relative pb-32">
      <div class="mobile-steps">
        <template v-if="active === 0">
          <img src="../../assets/img/mobile-progress-first.png" alt="" />
          <span
            class="block w-full text-center text-12  mt-32"
          >手机验证：{{ mobile }}</span>
          <div class="m-s-code flex mt-16 relative">
            <span>短信验证码：</span>
            <div class="msg-code">
              <el-input
                v-model="code"
                size="small"
                class="msg-code-input"
              ></el-input>
              <div class="msg-code-link">
                <span v-if="showTimer"> {{ count }}s </span>
                <a v-else href="javascript:" @click="getCode">获取验证码</a>
              </div>
            </div>
            <ErrorMessage
              v-if="identityCode"
              text="验证码错误!"
              class="m-s-c-error"
            />
          </div>
          <el-button
            type="primary"
            size="small"
            :disabled="code === ''"
            class="m-s-btn"
            @click="nextStep"
          >下一步</el-button>
        </template>
        <template v-if="active === 1">
          <img src="../../assets/img/mobile-progress-second.png" alt="" />
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            size="small"
            label-width="100px"
            class="mt-32"
          >
            <el-form-item label="新手机号：" prop="newMobile">
              <el-input v-model="form.newMobile"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码：">
              <div class="msg-code">
                <el-input
                  v-model="form.identifyCode"
                  class="msg-code-input"
                ></el-input>
                <div class="msg-code-link">
                  <span v-if="showTimer"> {{ count }}s </span>
                  <a v-else href="javascript:" @click="getNextCode">获取验证码</a>
                </div>
              </div>
            </el-form-item>
            <ErrorMessage
              v-if="nextIdentityCode"
              text="验证码错误!"
              class="m-s-error"
            />
            <el-button
              type="primary"
              size="small"
              :disabled="form.newMobile === '' || form.identifyCode === ''"
              class="m-s-btn"
              @click="nextStepSecond"
            >下一步</el-button>
          </el-form>
        </template>
        <template v-if="active === 2">
          <img src="../../assets/img/mobile-progress-third.png" alt="" />
          <div class="m-b-success flex justify-center">
            <img src="../../assets/img/set-success.png" alt="" /><span>重置成功！</span>
          </div>
          <el-button
            size="small"
            class="m-b-btn"
            type="primary"
            plain
            @click="$router.push('/personal/account')"
          >返回安全中心</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心-修改手机模块
 * @author lyh
 * @date 2020-11-19
 */
import ErrorMessage from '@/components/ErrorMessage/index'
import PersonalHeader from '@/components/PersonalHeader/index'
export default {
  name: 'Mobile',
  components: { PersonalHeader, ErrorMessage },
  data() {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    const validateMobile = (rule, value, callback) => {
      if (value === '' || !reg.test(value)) {
        callback(new Error('请输入正确手机号'))
      } else if (value === this.mobile) {
        callback(new Error('与原手机号相同，请重新输入！'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      showTimer: false,
      timer: null,
      count: 0,
      mobile: this.$store.state.account.account.mobile,
      code: '', // 第一次验证码
      identityCode: false, // 验证码是否正确
      nextIdentityCode: false, // 重置手机号验证码是否正确
      form: {
        newMobile: '',
        identifyCode: ''
      },
      rules: {
        newMobile: [{ validator: validateMobile, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 验证身份 获取验证码
    getCode() {
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
    // 重置手机号 获取验证码
    getNextCode() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.getCode()
        }
      })
    },
    getMobileIdentifyCode() {
      this.$api.user
        .sendMobileIdentifyCode({
          type: this.active === 0 ? '5' : '6',
          mobile: this.active === 0 ? this.mobile : this.form.newMobile
        })
        .then(() => {
          this.$message({
            duration: 1500,
            message: '短信已发送成功，请注意查收！',
            type: 'success'
          })
        })
    },
    // 验证身份 下一步
    nextStep() {
      this.$api.user
        .modifyMobileOne({
          identifyCode: this.code
        })
        .then(res => {
          if (res.code === 1000) {
            this.active = 1
            if (this.timer) {
              this.showTimer = false
              clearInterval(this.timer)
              this.timer = null
            }
          }
        })
    },
    // 重置手机号 下一步
    nextStepSecond() {
      this.$api.user
        .modifyMobileTwo({
          newMobile: this.form.newMobile,
          identifyCode: this.form.identifyCode,
          identifyCodeFirst: this.code
        })
        .then(res => {
          if (res.code === 1050) {
            this.$message({
              duration: 1500,
              message: '两次验证码不一致！',
              type: 'warning'
            })
          }
          if (res.code === 1000) {
            this.active = 2
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.mobile {
  width: 904px;
  height: fit-content;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 32px 0 32px 24px;
  .mobile-steps {
    width: 480px;
    margin: 24px auto 0 auto;
  }
  .m-s-code {
    span {
      width: 112px;
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      margin-right: 8px;
      text-align: right;
    }
  }
  .m-s-btn {
    width: 104px;
    margin: 16px 0 0 188px;
  }
  .m-s-c-error {
    left: 100px;
    top: 32px;
  }
  .m-s-error {
    left: 322px;
    bottom: 78px;
  }
  .m-b-success {
    margin: 32px 0;
    img {
      width: 24px;
      height: 24px;
    }
    span {
      font-size: 14px;
      color: #1a1a1a;
      margin-left: 8px;
    }
  }
  .m-b-btn {
    width: 104px;
    margin-left: 188px;
  }

}
</style>
