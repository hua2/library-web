<template>
  <div class="collect-card">
    <el-card class="c-c-content relative">
      <div class="c-c-img flex justify-center mt-8 ml-8">
        <img :src="img" :alt="title" @click="openLink" />
      </div>
      <span class="c-c-title text-14 truncate" @click="openLink">{{ title }}</span>
      <div class="c-c-display mt-8">
        <span class="c-c-price flex justify-around text-16 ">
          <i class="el-icon-star-on" @click="collectClick"></i>
          <i class="el-icon-download" @click="downloadClick"></i>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
/**
 * 个人中心-收藏记录(card)模块
 * @author lyh
 * @date 2020-11-24
 */
export default {
  name: 'CollectShopCard',
  props: {
    title: {
      required: true,
      type: String,
      default: ''
    },
    img: {
      required: true,
      type: String,
      default: ''
    }
  },
  methods: {
    // 打开新窗口
    openLink() {
      this.$emit('link')
    },
    collectClick() {
      this.$emit('collect')
    },
    downloadClick() {
      this.$emit('download')
    }
  }
}
</script>

<style scoped lang="scss">
.collect-card {
  min-width: 184px;
  width: 184px;
  height: 176px;
  .c-c-content {
    height: 100%;
    border: unset;
    border-radius: unset;
    /deep/ {
      .el-card__body {
        height: 100%;
        padding: 0;
      }
    }
    .c-c-display{
      display: none;
      position: absolute;
      bottom: 58px;
      right: 12px;
      transition: 0.3s;
    }
    .c-c-img {
      cursor: pointer;
      margin: 8px;
      img {
        width: 168px;
        height: 114px;
      }
    }
    .c-c-title {
      cursor: pointer;
      margin-left: 12px;
      font-weight: 400;
    }
    .c-c-price {
      color: #d7262e;
      i{
        cursor: pointer;
        margin-left: 8px;
      }
    }
    &:hover{
      //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .c-c-display{
        display: block;
      }
    }
  }
}
</style>
