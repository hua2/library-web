<template>
  <div class="display">
    <div v-loading="loading" class="d-list">
      <div v-for="(p,index) in productData.data" :key="index">
        <a href="#" @click="openLink(p.id)">
          <img :src="p.watermarkImage" alt="" @load="setImgClass($event.target)" />
          <div class="d-l-mask">
            <span>{{ p.authorizationWay }}</span>
            <i class="el-icon-star-off" @click="collectClick(p.id)"></i>
          </div>
        </a>
      </div>
    </div>
    <p v-if="productData.data.length === 0">暂无数据</p>
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
</template>

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
      console.log(val)
      this.id = val.query.id
      this.productData.pageNumber = 1
      this.productData.pageSize = 20
      this.loadAll()
    }
  },
  created() {
    this.keyWords = this.$route.query.word
    if (this.keyWords) {
      this.loadAll()
    }
  },
  methods: {
    openLink(id) {
      this.$router.push({
        path: '/home/details',
        query: { id: id }
      })
    },
    setImgClass(e) {
      console.log(e)
      // console.log('setAttribute', e.setAttribute)
      // e.setAttribute('class', (e.width >= e.height ? 'landscape' : 'portrait')) // 原生js设置class
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
.display{
  width: 100%;
  .d-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    a{
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      padding: 0 10px 10px 0;
      .d-l-mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        span{
          left: 12px;
          top: 12px;
          position: absolute;
        }
        i{
          bottom: 24px;
          left: 12px;
          position: absolute;
        }
      }
      &:hover{
        .d-l-mask{
          opacity: 1;
          background: rgba(0, 0, 0, 0.2)
        }
      }
    }
  }
}
</style>
