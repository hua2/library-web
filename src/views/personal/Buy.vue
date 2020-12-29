<template>
  <div class="download">
    <div class="a-s-form">
      <el-form :inline="true" :model="form" size="small" label-width="72px">
        <div class="flex justify-between">
          <el-form-item label="图片ID：">
            <el-input v-model="form.keyWords" clearable></el-input>
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
            size="small"
            @click="search"
          >查询</el-button>
        </div>
      </el-form>
    </div>
    <div class="inquiry-table">
      <el-table
        v-loading="isLoading"
        :data="buyData.data"
        style="width: 100%"
      >
        <el-table-column prop="remarks" label="描述"></el-table-column>
        <el-table-column prop="orderCode" label="订单号"></el-table-column>
        <el-table-column prop="price" label="金额/元"></el-table-column>
        <el-table-column label="订单时间">
          <template
            slot-scope="scope"
          ><span style="color:#417505">{{ scope.row.payTime | moment("YYYY-MM-DD HH:mm") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!--          <template slot-scope="scope">-->
          <el-button
            type="text"
            size="small"
            class="after-btn"
            @click="dialogVisible = true"
          >
            联系客服
          </el-button>
          <!--          </template>-->
        </el-table-column>
      </el-table>
      <el-dialog
        title="联系客服"
        :visible.sync="dialogVisible"
        width="472px"
        custom-class="c-g--dialog"
        style="margin-top: 18vh"
      >
        <span>电话：010-67188377</span>
      </el-dialog>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="buyData.pageSize"
      :total="buyData.totalNum"
      class="mt-32 pr-32 flex justify-end"
      @current-change="changePageClick"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 * 个人中心-购买记录模块
 * @author lyh
 * @date 2020-11-19
 */
export default {
  name: 'Buy',
  data() {
    return {
      form: {
        keyWords: '',
        data: ''
      },
      buyData: {
        data: [],
        totalNum: 0,
        totalPage: 1,
        pageSize: 10,
        pageNumber: 1
      },
      isLoading: false,
      dialogVisible: false
    }
  },
  created() {
    this.loadAll()
  },
  methods: {
    search() {
      this.buyData.pageNumber = 1
      this.loadAll()
    },
    changePageClick(e) {
      this.buyData.pageNumber = e
      this.loadAll()
    },
    // 用户购买订单记录
    loadAll() {
      this.isLoading = true
      const date = this.form.date || []
      this.$api.user
        .userOrderList({
          searchType: 0,
          keyWords: this.form.keyWords,
          startTime: date[0] || '',
          endTime: date[1] || '',
          pageNumber: this.buyData.pageNumber,
          pageSize: this.buyData.pageSize
        })
        .then(res => {
          if (res.code === 1000) {
            this.buyData = res.data
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
  /deep/ {
    .el-dialog {
      border-radius: unset;
    }
    .el-dialog__header {
      border-bottom: unset;
      text-align: center;
      padding-top: 24px;
      .el-dialog__title{
        font-size: 20px;
        font-weight: bold;
      }
    }
    .el-dialog__body {
      text-align: center;
      padding: 24px 25px;
    }
    .el-dialog__footer {
      padding: 16px 0 55px 0;
    }
  }
  .el-button{
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
