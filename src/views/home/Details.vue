<template>
  <div class="details">
    <div class="details-contain flex items-center">
      <div class="d-c-left">
        <a href="#">
          <img
            :src="details.watermarkImage"
            alt=""
          />
        </a>
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
            <span>{{ details.name }}</span>
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
            <span class="d-c-title">授权方式：</span>
            <span>{{ details.authorizationWay }}</span>
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
        <el-button type="primary" icon="el-icon-star-off" @click="collectClick(details.id)">加入收藏</el-button>
        <el-button type="primary" class="btn" icon="el-icon-download" @click="downloadClick(details.id)">图片下载</el-button>
      </div>
    </div>
    <div class="details-keywords">
      <h3>关键词</h3>
      <div class="d-k-word">
        <span v-for="(d,index) in details.keyWordsList" :key="index" @click="searchClick(d)">{{ d }}
        </span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details',
  data() {
    return {
      id: '',
      details: {}
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getDetail()
    }
  },
  methods: {
    searchClick(word) {
      console.log('details', word)
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
        }
      })
    },
    downloadClick(id) {
      this.$api.user.userDownloadRecord({ productionId: id }).then(res => {
        if (res.code === 1000) {
          this.downloadRecord = res.data
        }
      })
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
    padding: 100px 8px 8px;
    .d-c-left {
      width: 68%;
      img {
        width: 100%;
        max-height: 500px;
      }
    }
    .d-c-right {
      width: 32%;
      padding: 82px 16px 16px;
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
        height: 50px;
        font-size: 16px;
        border: unset;
        margin-left: unset;
      }
      .btn{
        background: #2789ee;
      }
    }
  }
  .details-keywords {
    height: 300px;
    width: 100%;
    padding: 8px;
    h3 {
      font-size: 18px;
      color: #333;
      margin: 0 0 12px;
      font-weight: bold;
    }
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
}

</style>
