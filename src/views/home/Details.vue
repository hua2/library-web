<template>
  <div class="details">
    <el-input v-model="keyWords" placeholder="搜索图片……">
      <el-button slot="append" icon="el-icon-search" @click="searchClick(keyWords)"></el-button>
    </el-input>
    <div class="details-contain flex items-center">
      <div class="d-c-left">
        <img
          :src="details.watermarkImage"
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
          <a :href="record.url" :download="record.url">
          </a></el-button>
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
    <DownloadDialog ref="downloadDialog" />
  </div>
</template>

<script>
import DownloadDialog from '@/views/home/dialog/DownloadDialog'
export default {
  name: 'Details',
  components: { DownloadDialog },
  data() {
    return {
      id: '',
      details: {},
      record: {
        isCan: 0,
        url: ''
      },
      keyWords: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    // 下载充会员
    downloadDialogClick() {
      this.$refs.downloadDialog.dialogVisible = true
      this.$refs.downloadDialog.productMember()
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
    down(url) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', url)

      document.body.appendChild(link)
      link.click()
      // 释放URL对象所占资源
      window.URL.revokeObjectURL(url)
      // 用完即删
      document.body.removeChild(link)
    },
    downloadClick(id) {
      this.$api.user.userDownloadRecord({ productionId: id }).then(res => {
        if (res.code === 1000) {
          this.record = res.data
          if (this.record.isCan === 0) {
            this.downloadDialogClick()
          } else {
            this.down(this.record.url)
          }
        }
      })
    },
    download(data) {
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'excel.xlsx')

      document.body.appendChild(link)
      link.click()
    },
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
    padding: 8px;
    .d-c-left {
      width: 68%;
      display: flex;
      justify-content: center;
      img {
        width: 100%;
        height: 500px;
        object-fit: cover;
      }
    }
    .d-c-right {
      width: 32%;
      padding: 72px 16px 16px;
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
