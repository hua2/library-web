<template>
  <div class="download">
    <div class="a-s-form">
      <el-form :inline="true" :model="form" size="small" label-width="72px">
        <div class="flex justify-between">
          <el-form-item label="图片ID：">
            <el-input v-model="form.keyWords"></el-input>
          </el-form-item>
          <el-form-item label="交易日期：">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-button
            type="primary"
            class="a-s-btn"
            size="small"
            @click="search"
          >查询</el-button>
        </div>
      </el-form>
    </div>
    <div class="inquiry-table">
      <el-table
        v-loading="isLoading"
        :data="downloadData.data"
        style="width: 100%"
      >
        <el-table-column label="素材ID">
          <template slot-scope="scope">
            {{ scope.row.object.groupId }}
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.object.watermarkImage" alt="" class="img" />
          </template>
        </el-table-column>
        <el-table-column label="供图/作者">
          <template slot-scope="scope">
            {{ scope.row.object.authorizationWay }}
          </template>
        </el-table-column>
        <el-table-column label="下载时间">
          <template
            slot-scope="scope"
          ><span style="color:#417505">{{ scope.row.downloadTime | moment("YYYY-MM-DD HH:mm") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="after-btn"
              @click="downloadClick(scope.row.object.id)"
            >
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="downloadData.pageSize"
      :total="downloadData.totalNum"
      class="mt-32 pr-32 flex justify-end"
      @current-change="changePageClick"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 * 个人中心-下载记录模块
 * @author lyh
 * @date 2020-11-19
 */
import { down } from '@/utils/utils'
export default {
  name: 'Download',
  data() {
    return {
      form: {
        keyWords: '',
        data: ''
      },
      downloadData: {
        data: [],
        totalNum: 0,
        totalPage: 1,
        pageSize: 20,
        pageNumber: 1
      },
      isLoading: false,
      record: {}
    }
  },
  created() {
    this.loadAll()
  },
  methods: {
    downloadClick(id) {
      this.$api.user.userDownloadRecord({ productionId: id }).then(res => {
        if (res.code === 1000) {
          this.record = res.data
          if (this.record.isCan === 1) {
            down(this.record.url)
          }
        }
      })
    },
    search() {
      this.downloadData.pageNumber = 1
      this.loadAll()
    },
    changePageClick(e) {
      this.downloadData.pageNumber = e
      this.loadAll()
    },
    // 用户图片下载列表
    loadAll() {
      this.isLoading = true
      const date = this.form.date || []
      this.$api.user
        .userDownloadList({
          searchType: 0,
          keyWords: this.form.keyWords,
          startTime: date[0] || '',
          endTime: date[1] || '',
          pageNumber: this.downloadData.pageNumber,
          pageSize: this.downloadData.pageSize
        })
        .then(res => {
          if (res.code === 1000) {
            this.downloadData = res.data
          }
          this.isLoading = false
        })
    }

  }
}
</script>

<style scoped lang="scss">
.download{
  width: 100%;
    .el-button {
      width: 80px;
      height: 32px;
    }
  .img {
    width: 64px;
    height: 40px;
    margin: 0 auto;
  }
  .after-btn {
    color: #b76e2a;
    background: #fffcfa;
    border-color: #b76e2a;
  }
}
</style>
