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
          @click="openLink(pic.id)"
        >
          <i :style="{ paddingBottom: (pic.height / pic.width) * 100 + '%' }"></i>
          <img :src="pic.watermarkImage" />
          <div class="d-l-mask">
            <span>{{ pic.authorizationWay }}</span>
            <i class="el-icon-star-off" @click="collectClick(pic.id)"></i>
          </div>
        </div>
      </div>
      <p v-else>暂无数据</p>
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
      columnId: this.$route.query.id,
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
      this.id = val.query.id
      this.productData.pageNumber = 1
      this.productData.pageSize = 20
      this.loadAll()
    }
  },
  created() {
    this.keyWords = this.$route.query.word
    this.columnId = this.$route.query.id
    if (this.keyWords) {
      this.loadAll()
    }
    if (this.columnId) {
      this.loadAll()
    }
  },
  methods: {
    searchClick(word) {
      this.$router.push({
        path: '/home/display',
        query: { word: word }
      })
    },
    openLink(id) {
      console.log('id', id)
      this.$router.push({
        path: '/home/details',
        query: { id: id }
      })
    },
    loadAll() {
      this.loading = true
      this.$api.user.indexProduct({
        columnId: this.columnId,
        keyWords: this.keyWords,
        pageNumber: this.productData.pageNumber,
        pageSize: this.productData.pageSize
      }).then(res => {
        this.loading = false
        if (res.code === 1000) {
          this.productData = res.data
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
      &:hover{
        .d-l-mask{
          opacity: 1;
          background: rgba(0, 0, 0, 0.2)
        }
      }

      .d-l-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: #ffffff;
        transition: all 0.2s ease-in-out;
        z-index: 2000;
        span {
          left: 12px;
          top: 12px;
          position: absolute;
        }

        i {
          z-index: 2001;
          bottom: 24px;
          left: 12px;
          cursor: pointer;
          position: absolute;
        }
      }
    }
  }
}
</style>
