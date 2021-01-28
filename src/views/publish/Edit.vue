<template>
  <div class="w-full">
    <PersonalHeader text="供图发布" />
    <div v-loading="loading" class="publish">
      <div class="publish-form">
        <el-form
          ref="form"
          label-width="82px"
          label-position="left"
          size="small"
          :model="form"
        >
          <el-form-item label="上传" class="p-f-upload is-required">
            <el-upload
              class="avatar-uploader"
              :action="''"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleAvatarChange"
              :before-upload="beforeUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <div class="flex">
            <el-form-item label="标题：" class="is-required">
              <el-input v-model="form.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="类别：" class="is-required">
              <el-select v-model="form.columnId">
                <el-option
                  v-for="(li, index) in listData"
                  :key="index"
                  :label="li.title"
                  :value="li.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="关键词：" class="is-required">
              <el-input v-model="form.keyWords" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="软著：" class="is-required">
              <el-select v-model="form.copyright">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="版权说明：" class="is-required">
              <el-input v-model="form.rightExplain" placeholder="请描述版权说明"></el-input>
            </el-form-item>
            <el-form-item label="图片概述：" class="is-required">
              <el-input v-model="form.introduce" type="textarea" placeholder="请输入..."></el-input>
            </el-form-item>
          </div>
          <div class="p-f-btn flex justify-center">
            <el-button
              type="primary"
              size="medium"
              :loading="isLoading"
              :disabled="form.name === ''||form.columnId===''||form.keyWords===''||form.rightExplain===''||form.introduce===''||imageUrl===''"
              @click="editSingle"
            >发布</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalHeader from '@/components/PersonalHeader/index'
export default {
  name: 'Edit',
  components: { PersonalHeader },
  data() {
    return {
      form: {
        name: '',
        columnId: '',
        keyWords: '',
        copyright: 0,
        rightExplain: '',
        introduce: '',
        file: ''
      },
      listData: [],
      loading: false,
      isLoading: false,
      imageUrl: '',
      imageFile: null,
      id: ''
    }
  },
  created() {
    this.hideList()
    this.id = this.$route.query.id
    if (this.id) {
      this.getInfoProduct()
    }
  },
  methods: {
    handleAvatarChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imageFile = file.raw
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        this.$message({
          duration: 1500,
          message: '上传只能是图片格式！',
          type: 'error'
        })
      }
      return isImage
    },

    // 类别
    hideList() {
      this.$api.user.hideList().then(res => {
        if (res.code === 1000) {
          this.listData = res.data
        }
      })
    },
    // 编辑获取信息回显
    getInfoProduct() {
      this.loading = true
      this.$api.user.getInfoProduct({ id: this.id }).then(res => {
        this.loading = false
        if (res.code === 1000) {
          this.form = res.data
          this.imageUrl = res.data.watermarkImage
        }
      })
    },
    editSingle() {
      this.isLoading = true
      this.$api.user.modifySingle(
        {
          ...this.form,
          activityId: 0
        }
      ).then(res => {
        this.isLoading = false
        if (res.code === 1000) {
          this.$message({
            duration: 1000,
            message: '修改成功！',
            type: 'success'
          })
          this.$router.push('/publish/release')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.publish{
  width: 904px;
  height: fit-content;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 32px 42px 42px;
  .publish-form {
    width: 800px;
    margin: 24px auto 0 auto;
    /deep/{
      .el-form-item--small.el-form-item{
        &:nth-child(2n){
          margin-left: 32px;
        }
      }
      .el-input--small{
        width: 288px;
      }
      .el-dialog__body{
        padding: 16px 20px;
      }
      .el-textarea.is-disabled .el-textarea__inner{
        background-color: #F1F2F6;
      }
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
    .avatar {
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
