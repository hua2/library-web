<template>
  <div class="w-full">
    <PersonalHeader text="新增银行卡" />
    <div class="add-bank">
      <div class="add-steps pb-32">
        <template v-if="active === 0">
          <div class="flex justify-center items-center text-12 pt-32">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              size="small"
              label-width="84px"
            >
              <el-form-item prop="openSubBankName" label="开户行支行：">
                <el-input
                  v-model="form.openSubBankName"
                  size="small"
                  style="width: 360px"
                ></el-input>
              </el-form-item>
              <el-form-item prop="cardNumber" label="银行卡号码：">
                <el-input
                  v-model="form.cardNo"
                  size="small"
                  style="width: 360px"
                ></el-input>
              </el-form-item>
              <el-form-item prop="openAccountName" label="开户名：">
                <el-input
                  v-model="form.openAccountName"
                  size="small"
                  style="width: 360px"
                ></el-input>
              </el-form-item>
              <el-form-item prop="bingPhoneNumber" label="绑定手机号：">
                <el-input
                  v-model="form.bingPhoneNumber"
                  size="small"
                  style="width: 360px"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="flex justify-center mt-16">
            <el-button
              type="primary"
              size="medium"
              :disabled="form.openSubBankName === ''||form.openAccountName === '' || form.cardNumber === ''|| form.bingPhoneNumber === ''"
              @click="nextStep"
            >下一步</el-button>
          </div>
        </template>
        <template v-if="active === 1">
          <div class="m-c-card pt-32 ">
            <span class="m-c-c-tic block text-left text-12">
              本次操作需要短信确认，请输入 {{ mobile }} 收到的短信验证码
            </span>
            <div class="m-s-code flex justify-center items-center mt-16 ">
              <span class="text-14" style="width: 110px">短信验证码：</span>
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
            </div>
            <div class="flex justify-center mt-16">
              <el-button
                type="primary"
                size="medium"
                :disabled="code === ''"
                @click="addBankCard"
              >下一步</el-button>
            </div>
          </div>
        </template>
        <template v-if="active === 2">
          <div class="a-s-card flex flex-col">
            <div style="margin: 0 auto">
              <img src="../../../assets/img/finance-add-success.png" alt="" />
              <p class="text-14 mt-8">添加成功</p>
            </div>
            <div class="flex justify-center mt-16">
              <el-button
                type="primary"
                size="medium"
                @click="$router.push('/finance/bankCard')"
              >确定</el-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalHeader from '@/components/PersonalHeader/index'
/**
 * 财务管理-新增银行卡模块
 * @author lyh
 * @date 2021-01-19
 */
export default {
  name: 'AddBank',
  components: { PersonalHeader },
  data() {
    const mob = /^1[3|4|5|7|8][0-9]\d{8}$/
    const validateMobile = (rule, value, callback) => {
      if (value === '' || !mob.test(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
    const reg = /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/
    const validateCardNumber = (rule, value, callback) => {
      if (value === '' || !reg.test(value)) {
        callback(new Error('银行卡号只能在15位～19位之间!'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      form: {
        cardNo: '',
        openAccountName: '',
        openSubBankName: '',
        bingPhoneNumber: ''
      },
      showTimer: false,
      timer: null,
      count: 0,
      mobile: this.$store.state.account.account.mobile,
      code: '', // 第一次验证码
      identityCode: false, // 验证码是否正确
      rules: {
        cardNo: [{ validator: validateCardNumber, trigger: 'blur' }],
        bingPhoneNumber: [{ validator: validateMobile, trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    nextStep() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.active = 1
        }
      })
    },
    // 添加银行卡
    addBankCard() {
      this.$api.user
        .addBankCard({
          ...this.form,
          identifyCode: this.code,
          mobile: this.mobile
        })
        .then(res => {
          if (res.code === 1000) {
            this.active = 2
          }
        })
    },
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
    getMobileIdentifyCode() {
      this.$api.user
        .sendMobileIdentifyCode({
          type: '8',
          mobile: this.mobile
        })
        .then(() => {
          this.$message({
            duration: 1500,
            message: '短信已发送成功，请注意查收！',
            type: 'success'
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .add-bank {
    width: 904px;
    height: fit-content;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 32px 0 32px 24px;
    .add-steps {
      /deep/ {
        .el-button {
          width: 104px;
          font-size: 14px;
        }
      }
      .m-c-card {
        .m-c-c-tic {
          width: 252px;
          margin-left: 376px;
        }
        .m-s-code {
          span {
            width: 75px;
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            margin-right: 8px;
            text-align: right;
          }
          .msg-code {
            width: 239px;
          }
        }
        .m-c-c-content {
          height: 20px;
          line-height: 20px;
        }
      }
      .a-s-card {
        .c-t-c-content {
          height: 20px;
          line-height: 20px;
        }
        .el-button {
          width: 104px;
          height: 36px;
          font-size: 14px;
        }
        img {
          width: 56px;
          height: 56px;
        }
        p {
          color: #9d9fa6;
        }
      }
    }
}
</style>
