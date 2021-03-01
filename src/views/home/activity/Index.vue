<template>
  <div class="activity">
    <div class="a-theme">
      <h3>“回眸十三五、展望十四五”能源摄影作品征集活动</h3>
      <p>“十三五”期间，我国能源在习近平总书记“四个革命、一个合作”的战略指导下取得了长足进步。我国能源生产与消费持续增长，并且能源结构明显改善，非化石能源、可再生能源发电都取得了长足的进步。</p>
      <p> 在中国能源行业取得巨大发展的过程中，一大批能源工程项目为我国能源发展做出了巨大贡献。</p>
      <p>为展现中国能源“十三五”期间的成果，展望“十四五”发展脉络。同时也给各能源企业充分多维度地展现各自在“十三五”期间的发展成果，以及“十四五”期间的发展计划，《能源》杂志社主办了“回眸十三五、展望十四五”能源摄影作品征集活动。该活动目前正式面向各能源企业以及全国摄影爱好者征集摄影作品稿件。</p>
    </div>
    <div v-loading="loading">
      <div v-if="activityData.data.length > 0" class="d-list">
        <div
          v-for="(pic, index) in activityData.data"
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
        </div>
      </div>
      <div v-else class="text-center mt-48">
        <p style="color: #9d9fa6">暂无数据</p>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="activityData.pageSize"
        :total="activityData.totalNum"
        class="mt-32 pr-32 flex justify-end"
        @current-change="changePageClick"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      columnId: '',
      loading: false,
      activityData: {
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
      this.activityData.pageNumber = 1
      this.activityData.pageSize = 20
      this.loadAll()
    }
  },
  created() {
    this.columnId = this.$route.query.id
    if (this.columnId) {
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
    loadAll() {
      this.loading = true
      this.$api.user.indexProduct({
        ci: this.columnId,
        psort: 0,
        keyword: this.keyWords || '',
        pn: this.activityData.pageNumber,
        ps: this.activityData.pageSize
      }).then(res => {
        this.loading = false
        if (res.code === 1000) {
          this.activityData = res.data
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
      this.activityData.pageNumber = e
      this.loadAll()
    }
  }
}
</script>

<style scoped lang="scss">
.activity{
  width: 100%;
  height: 100%;
  .a-theme {
    font-size: 16px;
    color: #333;
    line-height: 24px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    padding: 24px;
    margin: 16px 0;

    h3 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    p {
      margin-bottom: 10px;
      text-align: justify;
    }
  }
}

</style>
