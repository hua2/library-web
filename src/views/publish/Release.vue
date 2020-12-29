<template>
  <div class="release">
    <div class="a-s-form">
      <el-form :inline="true" :model="form" size="small" label-width="72px">
        <div class="flex justify-between flex-wrap">
          <el-form-item label="图片ID：">
            <el-input v-model="form.keyWords"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="form.searchState">
              <el-option label="全部" value=""></el-option>
              <el-option label="已上架" :value="1"></el-option>
              <el-option label="已下架" :value="2"></el-option>
              <el-option label="待审核" :value="3"></el-option>
              <el-option label="已拒绝" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布日期：">
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
        :data="releaseData.data"
        style="width: 100%"
      >
        <!--        <el-table-column prop="columnId" label="类别"></el-table-column>-->
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.watermarkImage" alt="" class="img" />
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template
            slot-scope="scope"
          ><span style="color:#417505">{{ scope.row.updatedTime | moment("YYYY-MM-DD HH:mm") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <div
              :style="{
                color: checkStatusToColor(scope.row)
              }"
            >
              {{ scope.row.state === 1 ? "已上架" : scope.row.state === 2?'已下架':scope.row.state === 3?'待审核': '已拒绝' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="256">
          <div
            slot-scope="scope"
            class="flex items-center"
          >
            <el-button
              v-if="
                checkStatus(scope.row).spuRemoved
              "
              type="primary"
              plain
              size="mini"
              class="shelf-btn"
              :disabled="
                checkStatus(scope.row).spuReject ||
                  checkStatus(scope.row).spuPending
              "
              @click="upDownProduct(scope.row.id, '1')"
            >上架</el-button>
            <el-button
              v-if="checkStatus(scope.row).spuAdded"
              type="primary"
              plain
              size="mini"
              class="obtained-btn"
              :disabled="
                checkStatus(scope.row).spuReject ||
                  checkStatus(scope.row).spuPending
              "
              @click="upDownProduct(scope.row.id, '2')"
            >
              下架
            </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              class="edit-btn"
              @click="editProduct(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              class="delete-btn"
              @click="deleteProduct(scope.row.id)"
            >删除</el-button>
          </div>
        </el-table-column>
      </el-table></div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="releaseData.pageSize"
      :total="releaseData.totalNum"
      class="mt-32 pr-32 flex justify-end"
      @current-change="changePageClick"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 * 我的发布
 * @author lyh
 * @date 2020-11-27
 */
export default {
  name: 'Release',
  data() {
    return {
      form: {
        keyWords: '',
        searchState: '',
        data: ''
      },
      releaseData: {
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
    checkStatusToColor(row) {
      const status = this.checkStatus(row)
      if (status.spuPending) {
        return '#ff6e00'
      }
      if (status.spuRemoved) {
        return '#B5BACE'
      }
      if (status.spuAdded) {
        return '#00A75B'
      }
      if (status.spuRemoved) {
        return '#B5BACE'
      }
      return '#F3474F'
    },
    checkStatus(row) {
      const status = {
        spuAdded: false, //  已上架
        spuRemoved: false, //  已下架
        spuPending: false, //  待审核
        spuReject: false //  已驳回
      }
      if (row.state) {
        if (row.state === 1) {
          status.spuAdded = true
        }
        if (row.state === 2) {
          status.spuRemoved = true
        }
        if (row.state === 3) {
          status.spuPending = true
        }
        if (row.state === 4) {
          status.spuReject = true
        }
      }
      return status
    },
    // 图片管理-上架下架
    upDownProduct(id, status) {
      this.isLoading = true
      this.$api.user.upDownProduct({ id: id, state: status }).then(res => {
        this.isLoading = false
        if (res.code === 1000) {
          this.$message({
            duration: 1500,
            type: 'success'
          })
          this.search()
          this.$message.success(res.msg)
        }
      })
    },

    // 图片编辑
    editProduct(id) {
      this.$router.push({
        path: '/publish/index',
        query: { id: id }
      })
    },
    // 图片删除
    deleteProduct(id) {
      this.$confirm('您确定删除商品?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        showClose: false
      }).then(() => {
        this.isLoading = true
        this.$api.user.deleteProduct({ id: id }).then(res => {
          this.isLoading = false
          if (res.code === 1000) {
            this.search()
            this.$message.success(res.msg)
          }
        })
      })
    },
    search() {
      this.releaseData.pageNumber = 1
      this.loadAll()
    },
    changePageClick(e) {
      this.releaseData.pageNumber = e
      this.loadAll()
    },
    // 图片查询个人展示
    loadAll() {
      this.isLoading = true
      const date = this.form.date || []
      this.$api.user
        .personalList({
          searchType: 0,
          keyWords: this.form.keyWords,
          searchState: this.form.searchState,
          startTime: date[0] || '',
          endTime: date[1] || '',
          pageNumber: this.releaseData.pageNumber,
          pageSize: this.releaseData.pageSize
        })
        .then(res => {
          if (res.code === 1000) {
            this.releaseData = res.data
          }
          this.isLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.release{
  width: 100%;
  .el-button{
    width: 80px;
    height: 32px;
  }
  .img {
    width: 64px;
    height: 40px;
    margin: 0 auto;
  }
  .shelf-btn {
    color: #00a75b;
    background: #fbfff7;
    border-color: #00a75b;
  }
  .obtained-btn {
    color: #ff6e00;
    background: #fbfdff;
    border-color: #ff6e00;
  }
  .edit-btn {
    color: #0067c6;
    background: #eff6ff;
    border-color: #0067c6;
  }
  .delete-btn {
    color: #f3474f;
    background: #fff9f9;
    border-color: #f3474f;
  }
}
</style>
