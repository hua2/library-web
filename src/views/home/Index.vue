<template>
  <div class="home">
    <div class="search">
      <el-input v-model="keyWords" placeholder="搜索图片……" @keyup.enter.native="searchEnter">
        <el-button slot="append" icon="el-icon-search" @click="searchClick(keyWords)"></el-button>
      </el-input>
      <div v-for="(h,index) in searchData" :key="index" class="h-s-word" @click="searchClick(h.keyWord)">
        热门搜索：
        <span>{{ h.keyWord }}</span>
      </div>
    </div>
    <div v-loading="loading" class="home-content">
      <div v-for="(i,index) in moreData" :key="index" class="h-c-pic" @click="goToDisplay(i.id)">
        <img :src="i.image + '?x-oss-process=image/quality,q_55'" alt="">
        <div class="h-c-title">
          <h2>{{ i.title }}</h2>
          <div class="h-c-line" />
        </div>
      </div>
      <div class="h-c-more" @click="moreClick">更多 >></div>
      <div class="w-full h-c-activity">
        <div class="h-a-title">
          <img src="../../assets/img/hot-activity-icon.png" alt="">
          <h1>热门活动</h1>
          <div class="h-a-line"></div>
        </div>
        <div class="h-a-pic flex justify-between">
          <div class="h-a-cover cursor-pointer" @click="activityClick(27)">
            <img src="http://jm-prod-bkt-01.oss-cn-beijing.aliyuncs.com/md/picture/column/image_16143203428311.jpg" alt="">
            <p class="truncate">“回眸十三五、展望十四五”能源摄影作品征集活动</p>
          </div>
          <div class="h-a-other flex flex-wrap">
            <div class="h-a-reserved">
              <img src="https://jm-prod-bkt-01.oss-cn-beijing.aliyuncs.com/md/picture/banner/pic-one.jpg" alt="">
              <p class="truncate-2">“回眸十三五、展望十四五”能源摄影作品征集活动</p>
            </div>
            <div class="h-a-reserved">
              <img src="https://jm-prod-bkt-01.oss-cn-beijing.aliyuncs.com/md/picture/banner/pic-one.jpg" alt="">
              <p class="truncate-2">“回眸十三五、展望十四五”能源摄影作品征集活动</p>
            </div>
            <div class="h-a-reserved">
              <img src="https://jm-prod-bkt-01.oss-cn-beijing.aliyuncs.com/md/picture/banner/pic-one.jpg" alt="">
              <p class="truncate-2">“回眸十三五、展望十四五”能源摄影作品征集活动</p>
            </div>
            <div class="h-a-reserved">
              <img src="https://jm-prod-bkt-01.oss-cn-beijing.aliyuncs.com/md/picture/banner/pic-one.jpg" alt="">
              <p class="truncate-2">“回眸十三五、展望十四五”能源摄影作品征集活动</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-c-title">
        <h1>加入能源图库平台 | 成为签约供稿人</h1>
        <swiper v-if="partiesData.length>0" ref="mySwiper" :options="swiperOption">
          <swiper-slide v-for="(p,index) in partiesData" :key="index" class="swiper-item">
            <img :src="p.picPath + '?x-oss-process=image/quality,q_55'" alt="">
          </swiper-slide>
        </swiper>
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
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Home',
  components: { swiper, swiperSlide },
  data() {
    return {
      swiperOption: {
        init: false,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        },
        freeMode: true,
        speed: 4000,
        loop: true,
        slidesPerView: 7, // 设置slider容器能够同时显示的slides数量(carousel模式)。
        spaceBetween: 3
      },
      hideData: [],
      moreData: [],
      partiesData: [],
      searchData: [],
      keyWords: '',
      loading: false
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  updated() {
    if (this.partiesData.length > 1) {
      this.swiper.init()
    }
  },
  created() {
    this.hideList()
    this.partiesList()
    this.hotSearch()
  },
  methods: {
    // 回车搜索
    searchEnter(e) {
      const keyCode = window.event ? e.keyCode : e.which
      if (keyCode === 13 && this.keyWords) {
        this.$router.push({
          path: '/home/display',
          query: { word: this.keyWords }
        })
      }
    },
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
    // 热门搜索
    hotSearch() {
      this.$api.user.hotSearch().then(res => {
        if (res.code === 1000) {
          this.searchData = res.data
        }
      })
    },
    // 签约供稿人
    partiesList() {
      this.$api.user.partiesList().then(res => {
        if (res.code === 1000) {
          this.partiesData = res.data
        }
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
    },
    activityClick(id) {
      this.$router.push({
        path: '/home/activity',
        query: { id: id }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;

  .search {
    width: 100%;
    margin-bottom: 32px;

    .h-s-word {
      display: flex;
      flex-wrap: wrap;
      color: #908C8C;
      font-size: 14px;
      margin-left: 12px;

      span {
        cursor: pointer;
        margin-right: 12px;
      }
    }
  }

  /deep/ {
    .el-input {
      width: 100%;
      margin: 32px 0 6px 0;
    }
    .swiper-container-free-mode>.swiper-wrapper {
      -webkit-transition-timing-function: linear; /*之前是ease-out*/
      -moz-transition-timing-function: linear;
      -ms-transition-timing-function: linear;
      -o-transition-timing-function: linear;
      transition-timing-function: linear;
      margin: 0 auto;
    }
  }

  .home-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img{
      border-radius: 4px;
      object-fit: cover;
    }
    .h-c-pic {
      margin-bottom: 24px;

      img {
        width: 615px;
        height: 384px;
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
      width: 100%;
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

      .swiper-container {
        width: 100%;
        height: auto;
        padding-top: 72px;
        margin-left: auto;
        margin-right: auto;
      }
      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition-property: all;
        img{
          width: 178px;
          height: 240px;
        }
      }
    }
    .h-c-activity{
      margin: 72px auto 0;
      .h-a-title{
        display: flex;
        align-items: center;
        img{
          width: 32px;
          height: 32px;
        }

        h1 {
          width: 104px;
          font-size: 24px;
          color: #000000;
          letter-spacing: 2px;
          margin-right: 4px;
        }

        .h-a-line{
          width: calc(100% - 108px - 32px);
          height: 1px;
          margin-top: 18px;
          background: #979797;
        }
      }
       .h-a-pic {
         margin-top: 24px;
         p{
           margin-top: 4px;
           font-size: 14px;
         }
         .h-a-cover{
           width: 600px;

           img {
             width: 100%;
             height: calc(100% - 25px);
             min-height: 365px;
           }
         }
         .h-a-other{
           display: none;
           width: calc(100% - 600px);
           .h-a-reserved{
             width: 326px;
             margin-left: 6px;
             img {
               width: 100%;
               height: 158px;
             }
             &:nth-child(3),&:nth-child(4){
               margin-top: 24px;
             }
           }
         }
       }
    }
  }
}
</style>
