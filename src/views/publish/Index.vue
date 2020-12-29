<template>
  <div class="w-full">
    <PersonalHeader text="供图发布" />
    <div class="publish">
      <div class="publish-form">
        <el-form
          ref="form"
          label-width="108px"
          label-position="left"
          size="small"
          :model="form"
        >
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
          <el-form-item label="关键词：" class="is-required">
            <el-input v-model="form.keyWords" placeholder="请输入关键词"></el-input>
          </el-form-item>
          <el-form-item label="软著：" class="is-required">
            <el-radio v-model="form.copyright" :label="0">否</el-radio>
            <el-radio v-model="form.copyright" :label="1">是</el-radio>
          </el-form-item>
          <el-form-item label="版权说明：" class="is-required">
            <el-input v-model="form.rightExplain" placeholder="请描述版权说明"></el-input>
          </el-form-item>
          <el-form-item label="上传：" class="p-f-upload is-required">
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
          <el-form-item label="图片概述：" class="is-required">
            <el-input v-model="form.introduce" type="textarea" :rows="8" placeholder="请输入..."></el-input>
          </el-form-item>
          <div class="p-f-btn flex justify-center">
            <el-button
              type="primary"
              size="medium"
              :loading="isLoading"
              :disabled="form.name === ''||form.columnId===''||form.keyWords===''||form.rightExplain===''||form.introduce===''||imageUrl===''"
              @click="publishSingle"
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
  name: 'Index',
  components: { PersonalHeader },
  data() {
    return {
      form: {
        type: 0,
        name: '',
        columnId: '',
        keyWords: '',
        copyright: 0,
        rightExplain: '',
        introduce: '',
        file: ''
      },
      listData: [],
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
    hideList() {
      this.$api.user.hideList().then(res => {
        if (res.code === 1000) {
          this.listData = res.data
        }
      })
    },
    getInfoProduct() {
      this.$api.user.getInfoProduct({ id: this.id }).then(res => {
        if (res.code === 1000) {
          this.form = res.data
          this.imageUrl = res.data.watermarkImage
        }
      })
    },
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
    publishSingle() {
      this.isLoading = true
      let updateMethods = 'publishSingle'
      if (this.id) {
        updateMethods = 'modifySingle'
      }
      if (this.imageFile) {
        this.form.file = this.imageFile
      }
      this.$api.user[updateMethods](this.form).then(res => {
        this.isLoading = false
        if (res.code === 1000) {
          this.$message({
            duration: 500,
            message: '发布成功！',
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
  height: 684px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 32px 0 0 24px;
  .publish-form {
    width: 428px;
    margin: 24px auto 0 auto;
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
