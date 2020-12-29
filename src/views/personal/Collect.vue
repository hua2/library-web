<template>
  <div class="collect-shop">
    <CollectTime class="mb-24" @collectClick="fixedCollect" />
    <div class="collect-operate flex justify-between pb-6">
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <span class="text-12 cursor-pointer" @click="cancelCollect">删除</span>
    </div>
    <div v-loading="loading" class="collect-list">
      <template v-if="pageData.data.length > 0">
        <el-checkbox-group
          v-model="checkedCollectIds"
          class="flex mt-8 flex-wrap"
          @change="handleCheckedCollectIdsChange"
        >

          <div
            v-for="(spu, index) in pageData.data"
            :key="index"
            class="relative c-l-card"
          >
            <div
              v-if="spu.status === '1'"
              class="c-l-disable"
            ></div>
            <CollectShopCard
              :title="spu.collect.name"
              :img="spu.collect.watermarkImage"
              @link="openLink(spu.collect.id)"
              @collect="collectClick(spu.collect.id)"
              @download="downloadClick(spu.collect.id)"
            />
            <!--          <el-checkbox-->
            <!--            v-if="spu.status === '1'"-->
            <!--          >&nbsp;</el-checkbox>-->
            <el-checkbox
              :label="spu.collect.id"
            >&nbsp;</el-checkbox>
          </div>
        </el-checkbox-group>
      </template>
      <div v-else class="text-center mt-48">
        <p style="color: #9d9fa6">暂无数据</p>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageData.pageSize"
      :total="pageData.totalNum"
      class="mt-32 pr-32 flex justify-end"
      @current-change="changePageClick"
    >
    </el-pagination>
    <DownloadDialog ref="downloadDialog" @close="closeClick" />
    <CompletePayment ref="paymentDialog" @pay="downloadClick" />
  </div>
</template>

<script>
import CollectShopCard from '@/views/personal/components/CollectShopCard'
import CollectTime from '@/views/personal/components/CollectTime'
import DownloadDialog from '@/views/home/dialog/DownloadDialog'
import CompletePayment from '@/views/home/dialog/CompletePayment'
import { down } from '@/utils/utils'
/**
 * 个人中心-收藏记录模块
 * @author lyh
 * @date 2020-11-24
 */
export default {
  name: 'Personal',
  components: { CompletePayment, DownloadDialog, CollectTime, CollectShopCard },
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      checkedCollectIds: [],
      loading: false,
      pageData: {
        data: [],
        totalNum: 0,
        totalPage: 1,
        pageSize: 10,
        pageNumber: 1
      },
      search: {
        searchType: 0,
        startTime: '',
        endTime: ''
      },
      ids: '',
      id: '',
      record: {},
      checkPaiedIntervalId: null
    }
  },
  created() {
    this.loadAll()
  },
  methods: {
    closeClick() {
      if (this.checkPaiedIntervalId) {
        clearInterval(this.checkPaiedIntervalId)
      }
    },
    handleCheckAllChange(val) {
      this.checkedCollectIds = val
        ? this.pageData.data.map(d => d.collect.id)
        : []
      this.isIndeterminate = false
    },
    handleCheckedCollectIdsChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.pageData.data.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.pageData.data.length
    },
    loadAll() {
      this.loading = true
      this.checkAll = false
      this.isIndeterminate = false
      this.checkedCollectIds = []
      this.$api.user
        .userCollectList({
          ...this.search,
          pageNumber: this.pageData.pageNumber,
          pageSize: this.pageData.pageSize
        })
        .then(res => {
          if (res.code === 1000) {
            this.pageData = res.data
          }
          this.loading = false
        })
    },
    // 固定时间
    fixedCollect(search) {
      this.search = { ...search }
      this.pageData.pageNumber = 1
      this.loadAll()
    },
    collectClick(id) {
      this.$api.user.cancelCollect({
        productionId: id
      }).then(res => {
        if (res.code === 1000) {
          this.$message.success('已取消收藏')
          this.fixedCollect()
        }
      })
    },
    // 立即下载
    downloadClick(id) {
      this.$api.user.userDownloadRecord({ productionId: id }).then(res => {
        if (res.code === 1000) {
          this.record = res.data
          if (this.record.isCan === 0) {
            this.userOrderSubmit(id)
            this.downloadDialogClick()
          } else {
            down(this.record.url)
          }
        }
      })
    },
    // 详情-用户购买订单
    userOrderSubmit(id) {
      this.$api.user.userOrderSubmit({
        orderType: 4,
        payment: 1,
        productionId: id
      }).then(res => {
        if (res.code === 1000) {
          this.$refs.downloadDialog.qrCode = res.data.qrCode
          this.$refs.downloadDialog.price = res.data.price
          this.checkPaied(res.data.orderCode, res.data.productionId)
        }
      })
    },
    // 查询交易是否成功
    checkPaied(orderCode, id) {
      if (this.checkPaiedIntervalId) {
        clearInterval(this.checkPaiedIntervalId)
      }
      this.checkPaiedIntervalId = setInterval(() => {
        this.$api.user.queryOrder({ orderCode }).then(res => {
          if (res.code === 1000 && res.data != null) {
            clearInterval(this.checkPaiedIntervalId)
            this.$refs.downloadDialog.dialogVisible = false
            this.$refs.paymentDialog.dialogFormVisible = true
            this.$refs.paymentDialog.id = id
          }
        })
      }, 1000)
    },
    // 下载充会员
    downloadDialogClick() {
      this.$refs.downloadDialog.dialogVisible = true
    },
    openLink(id) {
      this.$router.push({
        path: '/home/details',
        query: { id: id }
      })
    },
    // 用户图片取消收藏
    cancelCollect() {
      if (this.checkedCollectIds.length === 0) {
        this.$message({
          duration: 1000,
          message: '请先选中要删除的商品！',
          type: 'warning'
        })
        return
      }
      this.loading = true
      let searchMethod = 'cancelsCollect'
      if (this.checkedCollectIds.length === 1) {
        searchMethod = 'cancelCollect'
        const id = this.checkedCollectIds.toString()
        this.id = id
      } else {
        const ids = this.checkedCollectIds.toString()
        this.ids = ids
      }
      this.$api.user[searchMethod]({
        productionId: this.id,
        ids: this.ids
      })
        .then(res => {
          this.loading = false
          if (res.code === 1000) {
            this.fixedCollect()
            this.$message.success(res.msg)
          }
        })
    },
    changePageClick(e) {
      this.pageData.pageNumber = e
      this.loadAll()
    }
  }
}
</script>

<style scoped lang="scss">
.collect-shop {
  .collect-operate {
    border-bottom: 1px solid #f1f2f6;
    span {
      color: #d7262e;
    }
  }
  .c-l-disable {
    width: 184px;
    height: 184px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    background: rgba(234, 234, 234, 0.5)
      url("../../assets/img/cart-disable.png") no-repeat right top;
    background-size: 64px 64px;
  }
  .collect-list {
    position: relative;
    min-height: 120px;
    /deep/ {
      .el-checkbox {
        position: absolute;
        top: 8px;
        right: 0px;
        margin: 0;
      }
    }
    .c-l-card {
      margin: 0 56px;
      margin-bottom: 8px;
      &:nth-child(1n) {
        margin-left: 0;
      }
      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
