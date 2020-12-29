<template>
  <div class="display">
    <el-input v-model="keyWords" placeholder="搜索图片……">
      <el-button slot="append" icon="el-icon-search" @click="searchClick(keyWords)"></el-button>
    </el-input>
    <div v-loading="loading">
      <div v-if="productData.data.length > 0" class="d-list">
        <div
          v-for="(pic, index) in productData.data"
          :key="index"
          class="d-l-pic relative"
          :style="{
            flexBasis: (pic.width * 240) / pic.height + 'px',
            flexGrow: (pic.width * 100) / pic.height
          }"
        >
          <i :style="{ paddingBottom: (pic.height / pic.width) * 100 + '%' }"></i>
          <template>
            <img :src="pic.watermarkImage" />
            <div class="shadow" @click="openLink(pic.id)"></div>
          </template>
          <div class="d-l-mask">
            <i class="el-icon-star-off" @click="collectClick(pic.id)"></i>
          </div>
          <!--          <div class="d-l-sign">-->
          <!--            <span>-->
          <!--              {{ pic.authorizationWay }}-->
          <!--            </span>-->
          <!--          </div>-->
        </div>
      </div>
      <div v-else class="text-center mt-48">
        <p style="color: #9d9fa6">暂无数据</p>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="productData.pageSize"
        :total="productData.totalNum"
        class="mt-32 pr-32 flex justify-end"
        @current-change="changePageClick"
      >
      </el-pagination>
    </div>
  </div></template>

<script>
export default {
  name: 'Display',
  data() {
    return {
      columnId: '',
      keyWords: '',
      loading: false,
      productData: {
        data: [],
        totalNum: 0,
        totalPage: 1,
        pageSize: 20,
        pageNumber: 1
      }
    }
  },
  watch: {
    $route(val) {
      this.columnId = val.query.id
      this.productData.pageNumber = 1
      this.productData.pageSize = 20
      this.loadAll()
    }
  },
  created() {
    this.keyWords = this.$route.query.word
    this.columnId = this.$route.query.id
    if (this.keyWords || this.columnId) {
      this.loadAll()
    }
  },
  methods: {
    searchClick(word) {
      this.$router.push({
        path: '/home/display',
        query: { word: word, id: this.columnId || '' }
      })
    },
    openLink(id) {
      this.$router.push({
        path: '/home/details',
        query: { id: id }
      })
    },
    loadAll() {
      this.loading = true
      this.$api.user.indexProduct({
        ci: this.columnId || '',
        psort: 0,
        keyword: this.keyWords || '',
        pn: this.productData.pageNumber,
        ps: this.productData.pageSize
      }).then(res => {
        this.loading = false
        if (res.code === 1000) {
          this.productData = res.data
          this.keyWords = ''
        }
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
    changePageClick(e) {
      this.productData.pageNumber = e
      this.loadAll()
    }
  }
}
</script>

<style scoped lang="scss">
.display {
  width: 100%;
  height: 100%;

  .d-list {
    display: flex;
    flex-wrap: wrap;
    margin: 2px;
    text-align: left;
    // 最后一行展示形式，可注释掉查看另一种形式
    &::after {
      content: "";
      flex-grow: 999999999;
      order: 999999999;
    }

    .d-l-pic {
      margin: 2px;
      background-color: violet;
      position: relative;
      cursor: pointer;
      // 加载占位符
      & > i {
        display: block;
        background-color: lightblue;
        /* display: none; */
      }

      & > img {
        position: absolute;
        vertical-align: bottom;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      & > .shadow{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
      }
      &:hover{
        .d-l-mask{
          opacity: 1;
          z-index: 2001;
        }
        .d-l-sign{
           opacity: 1;
        }
        .shadow{
          z-index: 2000;
          opacity: 1;
        }
      }

      .d-l-mask {
        position: absolute;
        left: 16px;
        right: 18px;
        bottom: 20px;
        text-align: left;
        opacity: 0;
        transform: translateX(-8px);
        transition: all 0.2s ease-in-out;
        i {
          width: 32px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          border-radius: 2px;
          margin: 0 4px 4px 0;
          cursor: pointer;
          user-select: none;
        }
      }
      .d-l-sign{
        position: absolute;
        top: 12px;
        left: 12px;
        cursor: pointer;
        opacity: 0;
        span{
          font-size: 14px;
          padding: 0 5px;
          background: #fff;
          color: #666666;
          vertical-align: middle;
          border-radius: 2px;
          transition: all 0.2s ease-in-out
        }
      }
    }
  }
}
</style>
