<template>
  <div class="details">
    <el-input v-model="keyWords" placeholder="搜索图片……">
      <el-button slot="append" icon="el-icon-search" @click="searchClick(keyWords)"></el-button>
    </el-input>
    <div class="details-contain flex items-center">
      <div class="d-c-left">
        <img
          :src="details.watermarkImage + '?x-oss-process=image/quality,q_55'"
          alt=""
        />
      </div>
      <div class="d-c-right">
        <h4>基本信息</h4>
        <div>
          <p>
            <span class="d-c-title">ID:</span>
            <span>{{ details.code }}</span>
          </p>
          <p>
            <span class="d-c-title">作者/来源：</span>
            <span>{{ details.authorName }}</span>
          </p>
          <p>
            <span class="d-c-title">最大尺寸：</span>
            <span>{{ details.width }} x {{ details.height }} </span>
          </p>
          <p>
            <span class="d-c-title">格式：</span>
            <span>{{ details.format }}</span>
          </p>
          <p>
            <span class="d-c-title">介绍：</span>
            <span>{{ details.introduce }}</span>
          </p>
          <p>
            <span class="d-c-title">第三方权力说明：</span>
            <span>{{ details.rightExplain }}</span>
          </p>
        </div>
        <el-button v-if="details.collect === 1" type="primary" icon="el-icon-star-on" @click="cancelCollect(details.id)">
          取消收藏
        </el-button>
        <el-button v-else type="primary" icon="el-icon-star-off" @click="collectClick(details.id)">
          加入收藏
        </el-button>
        <el-button type="primary" class="btn" icon="el-icon-download" @click="downloadClick(details.id)">
          图片下载
        </el-button>
      </div>
    </div>
    <div class="details-keywords">
      <h3>关键词</h3>
      <div class="d-k-word">
        <span v-for="(d,index) in details.keyWordsList" :key="index" @click="searchClick(d)">{{ d }}
        </span></div>
    </div>
    <div class="details-copy">
      <h3>版权声明</h3>
      <p>本网站图片、视频、音乐、设计、字体等版权作品（公关宣传类作品、公共领域作品及特殊设计加工类作品等除外）， 均由本网站或版权所有人授权本网站发布，本网站有权提供版权授权使用许可。如您需将版权作品用于包括但不限于公开媒介发布、 设计、展示、推广及其他等用途，请联系本网站签订协议，支付版权许可使用费。需授权许可的场景包括但不限于社交网络媒体（微博、微信公众号）、 网站、APP、书籍、报纸、期刊、电视节目、电影作品、展览、装修装饰、 包装设计、广告、公关活动、宣传图册、PPT演示等。 如您未经授权许可使用本网站的版权作品，则存在侵犯版权的法律风险，将依法承担法律责任。</p>
    </div>
    <DownloadDialog ref="downloadDialog" @close="closeClick" />
    <CompletePayment ref="paymentDialog" @pay="downloadClick" />
  </div>
</template>

<script>
import DownloadDialog from '@/views/home/dialog/DownloadDialog'
import CompletePayment from '@/views/home/dialog/CompletePayment'
import { down } from '@/utils/utils'
export default {
  name: 'Details',
  components: { CompletePayment, DownloadDialog },
  data() {
    return {
      id: '',
      details: {},
      record: {
        isCan: 0,
        url: ''
      },
      keyWords: '',
      checkPaiedIntervalId: null
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getDetail()
    }
  },
  beforeDestroy() {
    if (this.checkPaiedIntervalId) {
      clearInterval(this.checkPaiedIntervalId)
    }
  },
  methods: {
    closeClick() {
      if (this.checkPaiedIntervalId) {
        clearInterval(this.checkPaiedIntervalId)
      }
    },
    // 下载充会员
    downloadDialogClick() {
      this.$refs.downloadDialog.dialogVisible = true
    },
    searchClick(word) {
      this.$router.push({
        path: '/home/display',
        query: { word: word }
      })
    },
    // 收藏
    collectClick(id) {
      this.$api.user.userCollect({ productionId: id }).then(res => {
        if (res.code === 1000) {
          this.$message.success('收藏成功')
          this.getDetail()
        }
      })
    },
    // 取消收藏
    cancelCollect(id) {
      this.$api.user.cancelCollect({ productionId: id }).then(res => {
        if (res.code === 1000) {
          this.$message.success('取消收藏成功')
          this.getDetail()
        }
      })
    },
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
    // 获取图片详情
    getDetail() {
      this.$api.user.getDetail({ id: this.id }).then(res => {
        if (res.code === 1000) {
          this.details = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.details{
  width: 100%;
  .details-contain {
    .d-c-left {
      width: 68%;
      display: flex;
      justify-content: center;
      img {
        width: 100%;
        //height: 500px;
        max-height: 500px;
        object-fit: cover;
      }
    }
    .d-c-right {
      width: 32%;
      padding-left: 24px;
      p {
        font-size: 12px;
        line-height: 1.6;
        color: #666;
        display: flex;
        padding: 3px 3px 3px 0;
        .d-c-title {
          min-width: 100px;
          white-space: nowrap;
        }
      }
      .el-button{
        margin-top: 24px;
        width: 100%;
        max-width: 368px;
        height: 48px;
        font-size: 16px;
        border: unset;
        margin-left: unset;
      }
      .btn{
        background: #2789ee;
      }
    }
  }
  h3 {
    font-size: 18px;
    color: #333;
    margin: 0 0 12px;
    font-weight: bold;
  }
  .details-keywords {
    height: fit-content;
    padding: 8px;
    margin-top: 24px;
    background: #fafafa;
    .d-k-word {
      height: 34px;
      cursor: pointer;
      margin-bottom: 5px;
      span {
        display: inline-block;
        font-size: 12px;
        padding: 6px 14px;
        color: #666;
        border: 1px solid #ddd;
        border-radius: 3px;
        margin: 0 6px 6px 0;
      }
    }
  }
  .details-copy{
   margin: 24px 0 32px 0;
    p{
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }
  }
}

</style>
