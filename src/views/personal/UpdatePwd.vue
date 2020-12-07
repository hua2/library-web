<template>
  <div class="w-full">
    <PersonalHeader text="修改密码" />
    <div class="update">
      <div class="updatePwd-form relative">
        <el-form
          ref="form"
          label-width="108px"
          label-position="left"
          size="small"
          :model="form"
          :rules="rules"
        >
          <el-form-item label="原登录密码：" class="is-required">
            <el-input v-model="form.oldLoginPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item
            label="新密码："
            prop="newLoginPwd"
            class="is-required"
          >
            <el-input v-model="form.newLoginPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item
            label="确认新密码："
            prop="newLoginPwd2"
            class="is-required"
          >
            <el-input v-model="form.newLoginPwd2" type="password"></el-input>
          </el-form-item>
          <span
            class="u-f-notice flex"
          >*必须是6-20位英文字母、数字或符号(除空格)，且字母、数字至少包含两种</span>
          <el-form-item class="text-center">
            <el-button
              class="u-p-btn"
              type="primary"
              :disabled="
                form.oldLoginPwd === '' ||
                  form.newLoginPwd === '' ||
                  form.newLoginPwd2 === ''
              "
              @click="updatePwd"
            >确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心-修改密码模块
 * @author lyh
 * @date 2020-11-19
 */
import PersonalHeader from '@/components/PersonalHeader/index'
export default {
  name: 'UpdatePwd',
  components: { PersonalHeader },
  data() {
    const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('请按照下方密码规则设置密码！'))
      } else {
        if (this.form.newLoginPwd2 !== '') {
          this.$refs.form.validateField('newLoginPwd2')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newLoginPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldLoginPwd: '',
        newLoginPwd: '',
        newLoginPwd2: ''
      },
      rules: {
        newLoginPwd: [{ validator: validatePass, trigger: 'blur' }],
        newLoginPwd2: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    updatePwd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$api.user.modifyPwd(this.form).then(res => {
            if (res.code === 1000) {
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
.update {
  width: 904px;
  height: 326px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 32px 0 0 24px;

    .updatePwd-form {
      width: 428px;
      margin: 24px auto 0 auto;

      .u-p-btn {
        width: 104px;
        margin-left: 30px;
      }

      .u-f-notice {
        width: 403px;
        font-size: 12px;
        color: #858b93;
        margin: 8px 0 16px 108px;
      }

      .u-f-error {
        left: 96px;
        top: 33px;
      }
    }
}
</style>
