<template>
  <div class="w-full">
    <PersonalHeader text="认证供图" />
    <div class="attest">
      <div class="attest-steps">
        <template v-if="active === 2">
          <img src="../../assets/img/attest-progress-second.png" alt="" />
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            size="small"
            label-width="100px"
            class="mt-32"
          >

            <el-form-item label="类型：">
              <el-select v-model="form.type" :disabled="this.id !== ''">
                <el-option label="个人" :value="1"></el-option>
                <el-option label="企业" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <template v-if="form.type===2">
              <el-form-item label="公司名称：">
                <el-input v-model="form.companyName" :disabled="this.id !== ''"></el-input>
              </el-form-item>
              <el-form-item label="统一信用代码：">
                <el-input v-model="form.businessLicenseNumber" :disabled="this.id !== ''"></el-input>
              </el-form-item>
            </template>
            <el-form-item :label="form.type===2?'负责人姓名：':'姓名：'">
              <el-input v-model="form.principalName" :disabled="this.id !== ''&& this.type !== 2"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码：">
              <el-input v-model="form.idCardNumber" :disabled="this.id !== ''&& this.type !== 2"></el-input>
            </el-form-item>
            <template v-if="type !== 1">
              <el-form-item label="手机号：" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
              </el-form-item>
              <el-form-item label="验证码：">
                <div class="f-p-code flex">
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
              <div class="text-center">
                <el-checkbox v-model="agree">
                  我同意<a
                    href="javascript:"
                    @click="serviceDialogClick"
                  >《能源图库用户服务条款》</a>
                </el-checkbox>
              </div>
            </template>
            <el-button
              v-if="form.type===2"
              type="primary"
              size="small"
              class="m-s-btn"
              :disabled="form.type === '' || form.principalName === ''|| form.idCardNumber === ''|| form.mobile === ''|| form.identifyCode === ''
                || form.companyName === ''|| form.businessLicenseNumber === ''"
              @click="nextStepSecond"
            >确认</el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              class="m-s-btn"
              :disabled="type === 1 || form.type === '' || form.principalName === ''|| form.idCardNumber === ''|| form.mobile === ''|| form.identifyCode === ''"
              @click="nextStepSecond"
            >确认</el-button>
          </el-form>
        </template>
        <template v-if="active === 3">
          <img src="../../assets/img/attest-audit-icon.png" alt="" />
          <div class="m-b-success flex justify-center">
            <img src="../../assets/img/attest-audit-btn.png" alt="" />
          </div>
        </template>
      </div>
    </div>
    <ServiceDialog ref="serviceDialog" />
  </div>
</template>

<script>
import PersonalHeader from '@/components/PersonalHeader/index'
import ServiceDialog from '@/views/other/dialog/ServiceDialog'
export default {
  name: 'Index',
  components: { ServiceDialog, PersonalHeader },
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
      active: 2,
      form: {
        type: '',
        principalName: '',
        idCardNumber: '',
        mobile: '',
        identifyCode: '',
        companyName: '',
        businessLicenseNumber: ''
      },
      agree: false,
      showTimer: false,
      timer: null,
      count: 0,
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }]
      },
      id: '',
      type: '', // 用于认证回显判断
      status: ''
    }
  },
  created() {
    this.status = this.$route.query.status
    if (this.status === 1 || this.status === 2) {
      this.getUserAuthInfo()
    }
  },
  methods: {
    getUserAuthInfo() {
      this.$api.user.getUserAuthInfo().then(res => {
        if (res.code === 1000) {
          this.form = res.data
          this.id = res.data.id
          this.type = res.data.type
        }
      })
    },
    // 服务条款
    serviceDialogClick() {
      this.$refs.serviceDialog.dialogVisible = true
    },
    // 下一步
    nextStepSecond() {
      if (!this.agree) {
        this.$message({
          duration: 1500,
          message: '请阅读并同意该协议！',
          type: 'warning'
        })
        return
      }
      let authMethods = 'personalAuth'
      if (this.form.type === 2) {
        authMethods = 'companyAuth'
      }
      if (this.id) {
        this.$api.user.modifyUserAuth(this.form).then(res => {
          if (res.code === 1000) {
            this.$message({
              duration: 1500,
              message: '修改成功！',
              type: 'success'
            })
            this.showTimer = false
            clearInterval(this.timer)
            this.timer = null
            this.getUserAuthInfo()
          }
        })
      } else {
        this.$api.user[authMethods](this.form).then(res => {
          if (res.code === 1000) {
            this.active = 3
          }
        })
      }
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
    },
    getMobileIdentifyCode() {
      this.$api.user
        .sendMobileIdentifyCode({
          type: '7',
          mobile: this.form.mobile
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
.attest{
  .f-p-code {
    .el-input {
      width: 128px;
    }
    .el-button {
      width: 80px;
      margin-left: 24px;
    }
  }
}
</style>
