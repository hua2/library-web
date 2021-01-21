<template>
  <div class="record">
    <div class="a-s-form">
      <el-form :inline="true" :model="form" size="small" label-width="72px">
        <div class="flex">
          <el-form-item label="交易日期：">
            <el-date-picker
              v-model="form.date"
              type="monthrange"
              value-format="yyyy-MM"
              range-separator="-"
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
    <div class="record-table mt-16">
      <el-table v-loading="isLoading" :data="recordData.data" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="收益日期">
          <template slot-scope="scope">
            {{ scope.row.year }}-{{ scope.row.month }}
          </template>
        </el-table-column>
        <el-table-column prop="earnings" label="收益金额"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="recordData.pageSize"
      :total="recordData.totalNum"
      class="mt-32 pr-32 flex justify-end"
      @current-change="changePageClick"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 * 财务管理(提现记录)模块
 * @author lyh
 * @date 2021-01-19
 */
export default {
  name: 'Index',
  components: {},
  data() {
    return {
      form: {
        date: ''
      },
      recordData: {
        data: [],
        totalNum: 0,
        totalPage: 1,
        pageSize: 10,
        pageNumber: 1
      },
      isLoading: false
    }
  },
  created() {
    this.loadAll()
  },
  methods: {
    search() {
      this.recordData.pageNumber = 1
      this.loadAll()
    },
    changePageClick(e) {
      this.recordData.pageNumber = e
      this.loadAll()
    },
    // 查询列表
    loadAll() {
      this.isLoading = true
      const date = this.form.date || []
      this.$api.user
        .queryList({
          startTime: date[0] || '',
          endTime: date[1] || '',
          sort: 1,
          searchType: 0,
          pageNumber: this.recordData.pageNumber,
          pageSize: this.recordData.pageSize
        })
        .then(res => {
          if (res.code === 1000) {
            this.recordData = res.data
          }
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.record {
  width: 100%;
  margin: 0 auto;
  .el-button{
    width: 80px;
    height: 32px;
  }
  .record-table {
    /deep/ {
      .el-table {
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
        border-radius: 9px;
      }
    }
  }
}
</style>
