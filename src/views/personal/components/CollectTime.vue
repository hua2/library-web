<template>
  <div class="collect-time flex justify-between">
    <div>
      <span class="text-12 mr-8">收藏时间：</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        size="small"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button
        type="primary"
        class="collect-btn ml-16"
        size="small"
        :disabled="!date"
        @click="searchClick()"
      >查询</el-button>
    </div>
    <div class="collect-sort flex justify-between text-14">
      <span
        class="flex"
        :class="searchType === 0 ? 'active' : ''"
        @click="collectClick(0)"
      ><img src="../../../assets/img/collect-sort.png" alt="" />全部</span>
      <span
        :class="searchType === 2 ? 'active' : ''"
        @click="collectClick(2)"
      >三天内</span>
      <span
        :class="searchType === 3 ? 'active' : ''"
        @click="collectClick(3)"
      >一个月内</span>
      <span
        :class="searchType === 4 ? 'active' : ''"
        @click="collectClick(4)"
      >三个月内</span>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心-我的收藏(收藏时间)通用模块
 * @author lyh
 * @date 2020-11-19
 */
export default {
  name: 'CollectTime',
  data() {
    return {
      date: '',
      searchType: 0 // 排序类型（0：全部；1：自定义；2：三天内 3:一个月内 4：三个月内）
    }
  },
  methods: {
    // 筛选时间 收藏商品列表
    collectClick(type) {
      if (this.searchType === type) {
        return
      }
      this.searchType = type
      this.date = null
      this.$emit('collectClick', { searchType: type, startTime: '', endTime: '' })
    },
    // 自定义时间查询
    searchClick() {
      this.searchType = null
      this.$emit('collectClick', {
        searchType: 0,
        startTime: this.date[0],
        endTime: this.date[1]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.collect-time {
  .collect-sort {
    line-height: 32px;
    width: 310px;
    height: 32px;
    border: 1px solid red;
    margin-left: 63px;
    padding: 0 16px;
    span {
      cursor: pointer;
      &.active {
        color: #d7262e;
      }
      img {
        width: 14px;
        height: 12px;
        margin: 10px 8px 0 0;
      }
    }
  }
  .collect-btn {
    width: 80px;
    height: 32px;
  }
}
</style>
