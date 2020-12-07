<template>
  <div class="personal w-full">
    <PersonalHeader text="账户信息" />
    <div class="personal-form relative">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="82px"
        label-position="left"
        size="small"
      >
        <el-form-item label="头像：" class="p-f-upload">
          <el-upload
            v-model="form.headPic"
            class="avatar-uploader"
            :action="''"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :http-request="doUpload"
          >
            <img
              v-if="form.headPic"
              :src="form.headPic"
              class="personal-avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio v-model="form.gender" :label="1">男</el-radio>
          <el-radio v-model="form.gender" :label="2">女</el-radio>
          <el-radio v-model="form.gender" :label="0">保密</el-radio>
        </el-form-item>
        <el-form-item label="出生日期：">
          <el-date-picker
            v-model="form.birthday"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.mobile" disabled></el-input>
        </el-form-item>
        <div class="p-f-btn flex justify-center">
          <el-button
            type="primary"
            size="medium"
            :loading="isLoading"
            @click="savePersonal"
          >保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心-个人信息模块
 * @author lyh
 * @date 2019-07-09
 */
import PersonalHeader from '@/components/PersonalHeader/index'
import store from '@/store'
export default {
  name: 'Personal',
  components: { PersonalHeader },
  data() {
    return {
      form: {
        headPic: '',
        nickname: '',
        gender: '',
        email: '',
        birthday: '',
        mobile: ''
      },
      rules: {
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      },
      isLoading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.loadPersonInfo()
  },
  methods: {
    loadPersonInfo() {
      this.$api.user.personInfo().then(res => {
        this.form = res.data
      })
    },
    doUpload(data) {
      return this.$api.user.uploadPic(data.file, '1')
    },
    handleSuccess(res) {
      if (res.code === 2001) {
        this.$message({
          duration: 1500,
          message: '图片上传失败！',
          type: 'error'
        })
        return
      }
      this.form.headPic = res.data
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        this.$message({
          duration: 1500,
          message: '上传头像只能是图片格式！',
          type: 'error'
        })
      }
      return isImage
    },

    savePersonal() {
      this.isLoading = true
      this.$api.user
        .modifyPersonInfo(this.form)
        .then(res => {
          this.isLoading = false
          if (res.code === 1000) {
            this.$message({
              duration: 1500,
              message: '保存成功！',
              type: 'success'
            })
            store.dispatch('getLoginUserDate')
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.personal {
  .personal-form {
    width: 904px;
    height: 452px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 32px 448px 32px 48px;
    .p-f-local {
      width: 186px;
      .p-f-select {
        width: 88px;
      }
    }
    .p-f-error {
      left: 14%;
      top: 220px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #d8d8d8;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #f1f2f6;
    }
    .personal-avatar {
      width: 80px;
      height: 80px;
    }
    .p-f-btn {
      .el-button {
        width: 104px;
      }
    }
  }
}
</style>
