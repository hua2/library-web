<template>
  <div class="w-full">
    <PersonalHeader text="供图发布" />
    <div class="publish">
      <div class="publish-upload">
        <el-upload ref="upload" action="#" list-type="picture-card" :multiple="true" :auto-upload="false" :on-change="handleUploadChange">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handleSetting(file)">
                <i class="el-icon-setting"></i>
              </span>

              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>

              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </div>
      <el-dialog :visible.sync="dialogVisible" :title="dialogImageName">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <br />
      <div class="publish-form">
        <el-form
          ref="form"
          label-width="82px"
          label-position="left"
          size="small"
          :disabled="imageInfoes.length===0"
        >
          <div class="flex">
            <el-form-item label="标题：" class="is-required">
              <el-input v-model="imageInfo.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="类别：" class="is-required">
              <el-select v-model="imageInfo.columnId">
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
              <el-input v-model="imageInfo.keyWord" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="软著：" class="is-required">
              <el-select v-model="imageInfo.copyright">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="版权说明：" class="is-required">
              <el-input v-model="imageInfo.rightExplain" placeholder="请描述版权说明"></el-input>
            </el-form-item>
            <el-form-item label="图片概述：" class="is-required">
              <el-input v-model="imageInfo.introduce" type="textarea" placeholder="请输入..."></el-input>
            </el-form-item>
          </div>
          <div class="p-f-btn flex justify-center">
            <el-button
              type="primary"
              size="medium"
              :loading="isLoading"
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
      dialogImageName: '',
      dialogImageUrl: '',
      dialogVisible: false,
      imageInfo: {
        name: '',
        columnId: '',
        keyWord: '',
        copyright: '',
        rightExplain: '',
        introduce: '',
        file: '',
        url: ''
      },
      imageInfoes: [],
      listData: [],
      isLoading: false
    }
  },
  created() {
    this.hideList()
  },
  methods: {
    handleUploadChange(file, fileList) {
      const savedIndex = fileList.findIndex(
        (x) => x.uid !== file.uid && x.name === file.name
      )
      if (savedIndex > -1) {
        this.$message.error(file.name + '已存在，请检查')
        fileList.splice(fileList.length - 1, 1)
        return
      }
      this.imageInfoes.push({
        url: file.url,
        file: file.raw,
        fileName: file.name,
        name: file.name,
        columnId: file.columnId,
        keyWord: file.keyWord,
        copyright: file.copyright,
        rightExplain: file.rightExplain,
        introduce: file.introduce
      })
      if (!this.imageInfo.name) {
        this.imageInfo = this.imageInfoes[0]
      }
    },
    handleRemove(file) {
      this.$refs.upload.handleRemove(file)
      const savedIndex = this.imageInfoes.findIndex(
        (x) => x.fileName === file.name
      )
      if (savedIndex > -1) {
        this.imageInfoes.splice(savedIndex, 1)
        if (this.imageInfo.fileName === file.name) {
          this.imageInfo = {
            name: ''
          }
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogImageName = file.name
      this.dialogVisible = true
    },
    handleSetting(file) {
      this.imageInfo = this.imageInfoes.find((x) => x.url === file.url)
    },
    // 类别
    hideList() {
      this.$api.user.hideList().then(res => {
        if (res.code === 1000) {
          this.listData = res.data
        }
      })
    },
    publishSingle() {
      let can = true
      this.imageInfoes.forEach(imageInfo => {
        Object.keys(imageInfo).forEach(k => {
          console.log(k)
          if (!imageInfo[k]) {
            can = false
          }
        })
      })
      if (!can) {
        this.$message({
          duration: 2000,
          message: '请输入必填内容！',
          type: 'warning'
        })
      } else {
        this.isLoading = true
        this.$api.user.publishSingle(this.imageInfoes).then(res => {
          this.isLoading = false
          if (res.code === 1000) {
            this.$message({
              duration: 2000,
              message: '发布成功！',
              type: 'success'
            })
            this.$router.push('/publish/release')
          }
        })
      }
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
  .publish-upload{
    max-height: 246px;
    overflow-y: auto;
  }
  /deep/{
    .el-upload--picture-card{
      font-size: 28px;
      color: #d8d8d8;
      width: 108px;
      height: 108px;
      line-height: 108px;
      text-align: center;
      background: #f1f2f6;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width: 108px;
      height: 108px;
      line-height: 108px;
    }
    .el-upload-list--picture-card .el-upload-list__item-thumbnail{
      width: 108px;
      height: 108px;
      object-fit: cover;
    }
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
  .publish-form {
    width: 800px;
    margin: 24px auto 0 auto;
    .p-f-btn {
      .el-button {
        width: 104px;
      }
    }
  }
}
</style>
