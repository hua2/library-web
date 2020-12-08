<template>
  <div class="home">
    <el-input v-model="keyWords" placeholder="搜索图片……">
      <el-button slot="append" icon="el-icon-search" @click="searchClick(keyWords)"></el-button>
    </el-input>
    <div v-loading="loading" class="home-content">
      <div v-for="(i,index) in moreData" :key="index" class="h-c-pic" @click="goToDisplay(i.id)">
        <img :src="i.image" alt="">
        <div class="h-c-title">
          <h2>{{ i.title }}</h2>
          <div class="h-c-line" />
        </div>
      </div>
      <div class="w-full h-c-more" @click="moreClick">更多 >></div>
      <div class="w-full h-c-title">
        <h1>加入能源图库平台 | 成为签约供稿人</h1>
        <div class="h-c-join flex">
          <img src="https://goss.cfp.cn/static/home/h2_5.png?x-oss-process=image/format,webp" alt="">
          <img src="https://goss.cfp.cn/static/home/h2_5.png?x-oss-process=image/format,webp" alt="">
          <img src="https://goss.cfp.cn/static/home/h2_5.png?x-oss-process=image/format,webp" alt="">
          <img src="https://goss.cfp.cn/static/home/h2_5.png?x-oss-process=image/format,webp" alt="">
          <img src="https://goss.cfp.cn/static/home/h2_5.png?x-oss-process=image/format,webp" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 首页模块
 * @author lyh
 * @date 2020-11-17
 */
export default {
  name: 'Home',
  components: { },
  data() {
    return {
      hideData: [],
      moreData: [],
      keyWords: '',
      loading: false
    }
  },
  created() {
    this.hideList()
  },
  methods: {
    searchClick(word) {
      this.$router.push({
        path: '/home/display',
        query: { word: word }
      })
    },
    goToDisplay(id) {
      this.$router.push({
        path: '/home/display',
        query: { id: id }
      })
    },
    hideList() {
      this.loading = true
      this.$api.user.hideList().then(res => {
        this.loading = false
        if (res.code === 1000) {
          this.hideData = res.data
          this.moreClick()
        }
      })
    },
    moreClick() {
      if (this.hideData.length === this.moreData.length) {
        this.$message.warning('无更多数据')
        return
      }
      const st = this.moreData.length
      const et = st + 4
      this.moreData.push(...(this.hideData.slice(st, et)))
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  .home-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .h-c-pic {
      margin-bottom: 24px;

      img {
        width: 615px;
        height: 384px;
        object-fit: cover;
        cursor: pointer;
      }

      .h-c-title {
        width: 146px;
        height: 40px;
        cursor: pointer;
        line-height: 40px;
        background: #ffffff;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.07);
        margin: 6px auto;
        border-radius: 4px;

        h2 {
          color: #DA534D;
          font-size: 16px;
          text-align: center;
        }

        .h-c-line {
          width: 66px;
          height: 4px;
          background: #DA534D;
          margin: 6px auto;
        }
      }
    }

    .h-c-more {
      font-size: 22px;
      color: #DA534D;
      cursor: pointer;
      text-align: right;
    }

    .h-c-title {
      margin: 72px auto;
      h1 {
        text-align: center;
        font-size: 30px;
        color: #000000;
        letter-spacing: 2px;
      }
      .h-c-join {
        overflow-x: auto;
        img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 6px;
          margin: 32px 12px 36px 0;
        }
      }
    }
  }
}
</style>
